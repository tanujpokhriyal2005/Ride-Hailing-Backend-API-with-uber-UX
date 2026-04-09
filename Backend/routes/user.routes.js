const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.contoller');
const {body} = require('express-validator');
const authUser = require('../middlewares/auth.middleware').authUser;


router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],
userController.registerUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],
userController.loginUser
);

router.get('/profile', authUser, userController.getUserProfile);
router.get('/logout', authUser, userController.logoutUser);



module.exports = router;