const { body, validationResult } = require('express-validator');
const req = require('express/lib/request');
const config = require('dotenv').config();
const User = require('../models/User');

exports.signUpGet = (req, res, next) => {
    res.render('signUpForm');
};

exports.signUpPost = [
    (req, res, next) => {
        console.log(req.body);
        next();
    },
    // Validate and sanitize user input
    body('firstName', 'First name must not be empty!')
    .trim()
    .isLength({ min: 1 })
    .escape(),

    body('lastName', 'Last name must not be empty!')
    .trim()
    .isLength({ min: 1 })
    .escape(),

    body('username', 'Username must not be empty!')
    .trim()
    .isLength({ min: 1 })
    .custom(async(username) => {
        const existingUser = await User.findOne({ username });

        console.log(existingUser);
        if (existingUser) {
            throw new Error('Username is already taken');
        }
    })
    .escape(),

    body('password', 'Pasword must be at least 8 characters ')
    .trim()
    .isLength({ min: 8 })
    .escape(),

    body('confirmPassword', 'Password fields does not match')
    .trim()
    .custom(
        (confirmPassword, { req }) => confirmPassword === req.body.password
    )
    .escape(),

    body('adminPassword', 'Invalid admin password')
    .trim()
    .custom((adminPassword) => {
        if (adminPassword) {
            return adminPassword === process.env.ADMIN_PASSWORD;
        }
        return true;
    })
    .escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors);

            res.render('signUpForm', {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                errors: errors.array(),
            });
        } else {
            const admin = req.body.adminPassword === process.env.ADMIN_PASSWORD;

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                isMember: false,
                isAdmin: admin,
            });

            newUser.save((err) => {
                if (err) {
                    return next(err);
                }

                res.render('index');
            });
        }
    },

    // Check that admin password is correct

    // encrypt password with passportjs

    // Save user to DB

    // Redirect to log in page
];