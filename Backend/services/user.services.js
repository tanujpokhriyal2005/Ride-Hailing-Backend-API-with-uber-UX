const userModel = require('../models/user.model');

module.exports.createUser = async ({firstname, lastname, email, password}) => {
    if(!email || !password || !firstname){
        const err = new Error('All fields are required');
        err.status = 400;
        throw err;
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
        const err = new Error('Email already registered');
        err.status = 409;
        err.isDuplicate = true;
        throw err;
    }

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
}
