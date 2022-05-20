const { body, validationResult } = require('express-validator');
const passport = require('passport');

exports.logInGet = (req, res, next) => {
    res.render('logInForm', {
        title: 'Log in',
    });
};

exports.logInPost = [
    // Validate and sanitize user input
    body('username').trim().escape(),
    body('password').trim().escape(),

    passport.authenticate('local', {
        failureRedirect: '/log-in',
        failureMessage: true,
        successRedirect: '/',
    }),
];