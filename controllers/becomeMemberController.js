const { body, validationResult } = require('express-validator');
const config = require('dotenv').config();
const User = require('../models/User');

exports.becomeMemberGet = (req, res, next) => {
    res.render('becomeMemberForm', {
        title: 'Become member',
    });
};

exports.becomeMemberPost = [
    body('memberPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Must not be ampty')
    .equals(process.env.MEMBER_PASSWORD)
    .withMessage('Incorrect password'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('becomeMemberForm', {
                title: 'Become member',
                errors: errors.array(),
            });
        } else {
            User.findByIdAndUpdate(req.user.id, { isMember: true }).exec(
                (err) => {
                    if (err) {
                        return next(err);
                    }

                    res.redirect('/');
                }
            );
        }
    },
];