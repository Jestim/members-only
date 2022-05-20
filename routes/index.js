const express = require('express');
const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');
const logOutController = require('../controllers/logOutController');
const becomeMemberController = require('../controllers/becomeMemberController');
const passport = require('passport');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Welcome to members only!' });
});

router.get('/home', (req, res, next) => {
    res.render('index', { title: 'Welcome to members only!' });
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

module.exports = router;