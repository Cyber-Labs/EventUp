const express = require('express');

const router = express.Router();

// import controller
const { verifyJwtToken } = require('../../controllers/User/auth');
const {
  showComment,
  createComment,
  editComment,
  deleteComment,
} = require('../../controllers/User/comment');

// Show all the comments of an event
router.get('/:eventId/comment', showComment);

// Create a new comment
router.post('/:eventId/comment', verifyJwtToken, createComment);

// Edit a comment
router.put('/:eventId/comment/:commentId', verifyJwtToken, editComment);

// Delete a comment
router.delete('/:eventId/comment/:commentId', verifyJwtToken, deleteComment);

module.exports = router;
