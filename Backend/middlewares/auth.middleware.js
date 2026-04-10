const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');



module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({error: 'Access denied.Unauthorized user'});

    }

    const isBlacklisted = await blacklistTokenModel.findOne({ blacklistToken: token });
    if (isBlacklisted) {
        return res.status(401).json({ error: 'Token has been blacklisted. Please log in again.' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({error: 'Access denied.Unauthorized user'});
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ blacklistToken: token }); 
    if (isBlacklisted) {
        return res.status(401).json({ error: 'Token has been blacklisted. Please log in again.' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }

}