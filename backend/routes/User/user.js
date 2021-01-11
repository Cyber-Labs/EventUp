const express = require('express');

const router = express.Router();

// import controller
const { requireSignin } = require('../../controllers/User/auth');
const { read, update } = require('../../controllers/User/user');

router.get('/:id', requireSignin, read);
router.put('/update', requireSignin, update);

module.exports = router;
