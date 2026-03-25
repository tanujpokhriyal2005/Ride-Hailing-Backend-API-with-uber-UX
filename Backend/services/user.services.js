const userModel = require('../models/user.model');

module.exports.createUser = async ({firstname, lastname, email, password}) => {
    if(!email || !password || !firstname){
        throw new Error('all fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password

    })
    return user;
}
