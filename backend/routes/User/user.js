const express = require('express');

const router = express.Router();

// import controller
const { requireSignin } = require('../../controllers/User/auth');
const {
  read,
  update,
  registeredEvents,
} = require('../../controllers/User/user');

router.get('/:id', requireSignin, read);
router.put('/update', requireSignin, update);
router.get('/registered-events', requireSignin, registeredEvents);

module.exports = router;
