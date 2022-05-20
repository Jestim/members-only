const express = require('express');
const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');
const becomeMemberController = require('../controllers/becomeMemberController');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Members only' });
});

router.get('/home', (req, res, next) => {
    res.render('index', { title: 'Members only' });
});

// Sign up routes
router.get('/sign-up', signUpController.signUpGet);

router.post('/sign-up', signUpController.signUpPost);

// Log in routes
router.get('/log-in', logInController.logInGet);

router.post('/log-in', logInController.logInPost);

// Become member routes
router.get('/become-member', becomeMemberController.becomeMemberGet);

router.post('/become-member', becomeMemberController.becomeMemberPost);

module.exports = router;