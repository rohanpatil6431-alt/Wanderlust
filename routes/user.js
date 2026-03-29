const express = require("express");
const router = express.Router();
const user = require('../models/user.js');
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { saveRedirectUrl } = require("../middleware.js");
const userController = require('../controllers/users.js');

router.route('/signup')
    .get(userController.signupForm)
    .post(wrapAsync(userController.signup));

router.route('/login')
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate('local', { failureFlash: true, failureRedirect: '/users/login' }), userController.login);

router.route('/logout')
    .get(userController.logout);

module.exports = router;