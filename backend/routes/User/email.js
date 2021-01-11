const express = require('express');

const router = express.Router();

// import controller
const { requireSignin } = require('../../controllers/User/auth');
const { sendEmail } = require('../../controllers/User/email');

router.post('/email', requireSignin, sendEmail);

module.exports = router;
