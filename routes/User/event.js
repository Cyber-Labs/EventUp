const express = require('express');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// import controller
const { requireSignin } = require('../../controllers/User/auth');
const {
        create,
        read, 
        update, 
        EventPageCount,
        EventPageData
    } = require('../../controllers/User/event');

// Create an event
router.post('/', requireSignin, upload.single("file"), create);

// The number of pages of event
router.get('/pagecount', EventPageCount);

// Data of the events on a particular page
router.get('/page/:pagenumber', EventPageData);

// Show details of the event
router.get('/:eventId', requireSignin, read);

// Update the details of the event
router.put('/:eventId', requireSignin, update);


module.exports = router;