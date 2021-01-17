const express = require('express');

const router = express.Router();

// import controller
const { requireSignin } = require('../../controllers/User/auth');
const {
  read,
  update,
  getRegisteredEvents,
  getCreatedEvents,
} = require('../../controllers/User/user');

router.put('/update', requireSignin, update);
router.get('/registered-events', requireSignin, getRegisteredEvents);
router.get('/created-events', requireSignin, getCreatedEvents);
router.get('/:id', requireSignin, read);

module.exports = router;
