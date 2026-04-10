const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.services');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vechile } = req.body;

    if (!vechile) {
        return res.status(400).json({ error: 'Vehicle details are required' });
    }

    const { color, plate, capacity, vechileType } = vechile;

    const isEmailTaken = await captainModel.findOne({ email });
    if (isEmailTaken) {
        return res.status(400).json({ error: 'Email is already registered' });
    }


    const hashedPassword = await captainModel.hashPassword(password);

    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color,
            plate,
            capacity,
            vechileType
        });

        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain || !captain.password) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);
    const responseCaptain = captain.toObject();
    delete responseCaptain.password;
    res.status(200).json({ token, captain: responseCaptain });
}

module.exports.getCaptainProfile = async (req, res) => {
    const captain = req.captain;
    res.status(200).json({ captain });
}

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ error: 'Token is required to logout' });
    }

    await blacklistTokenModel.create({ token });

    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}
