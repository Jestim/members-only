const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

exports.createPostGet = (req, res, next) => {
    res.render('createPostForm', {
        title: 'Create post',
    });
};
exports.createPostPost = [
    body('message', 'Message must not be empty').trim().isLength({ min: 1 }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('createPostForm', {
                title: 'Create Post',
                errors: errors.array(),
            });
        } else {
            const newPost = new Post({
                author: req.user.id,
                message: req.body.message,
            });

            newPost.save((err) => {
                if (err) {
                    return next(err);
                }

                res.redirect('/');
            });
        }
    },
];