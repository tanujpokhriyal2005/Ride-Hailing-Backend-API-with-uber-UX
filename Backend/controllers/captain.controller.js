const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.services');
const { validationResult } = require('express-validator');



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
