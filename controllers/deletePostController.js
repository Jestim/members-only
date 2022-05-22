const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

exports.deletePostDelete = [
    body('postId').escape(),
    (req, res, next) => {
        Post.findByIdAndDelete(req.body.postId).exec((err) => {
            if (err) {
                next(err);
            }

            res.redirect('/');
        });
    },
];