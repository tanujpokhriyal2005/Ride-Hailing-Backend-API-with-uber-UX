const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel= require('../models/user.model');
const userService = require('../services/user.services');
const {validationResult} = require('express-validator');
 
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {fullname, email, password} = req.body;

    const isEmailTaken = await userModel.findOne({ email });
    if (isEmailTaken) {
        return res.status(400).json({ error: 'Email is already registered' });
    }

    try {
        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch(err) {
        if (err.isDuplicate || err.code === 11000 || err.message.toLowerCase().includes('duplicate')) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        if (err.status) {
            return res.status(err.status).json({ error: err.message });
        }
        next(err);
    }
}

module.exports.loginUser = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({error: 'Invalid email or password'});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({error: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000 // 1 hour
    });
    res.json({user, token});
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({user: req.user});
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.token || req.headers.authorization.split('')[1];

    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });


}