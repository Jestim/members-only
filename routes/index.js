const express = require('express');
const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');
const logOutController = require('../controllers/logOutController');
const becomeMemberController = require('../controllers/becomeMemberController');
const createPostController = require('../controllers/createPostController');
const deletePostController = require('../controllers/deletePostController');
const passport = require('passport');
const Post = require('../models/Post');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    Post.find({})
        .populate('author')
        .sort({ timestamp: -1 })
        .exec((err, result) => {
            if (err) {
                return next(err);
            }

            console.log(result);

            res.render('index', {
                title: 'Welcome to members only!',
                posts: result,
            });
        });
});

router.get('/home', (req, res, next) => {
    res.redirect('/');
});

// Sign up routes
router.get('/sign-up', signUpController.signUpGet);

router.post('/sign-up', signUpController.signUpPost);

// Log in routes
router.get('/log-in', logInController.logInGet);

router.post('/log-in', logInController.logInPost);

// Log out route
router.get('/log-out', logOutController.logOutGet);

// Become member routes
router.get('/become-member', becomeMemberController.becomeMemberGet);

router.post('/become-member', becomeMemberController.becomeMemberPost);

// Create posts route
router.get('/create-post', createPostController.createPostGet);

router.post('/create-post', createPostController.createPostPost);

// Delete post route

router.post('/delete-post', deletePostController.deletePostDelete);

module.exports = router;