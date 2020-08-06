const express = require('express');
const router = express.Router();

// import controller
const {
    signup,
    signin,
} = require('../../controllers/User/auth');

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;