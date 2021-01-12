const Event = require('../../models/Event');
const Comment = require('../../models/Comment');

exports.showComment = (req, res) => {
  const { eventId } = req.params;
  Event.findById(eventId)
    .populate('comments')
    .exec((err, event) => {
      if (err || !event) {
        return res.status(400).json({
          success: false,
          errorMessage: 'Event not found',
        });
      }

      res.json({
        success: true,
        successMessage: 'Successfully found all the comments',
        data: event.comments,
      });
    });
};

exports.createComment = (req, res) => {
  const { eventId } = req.params;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      errorMessage: 'Message is Required',
    });
  }

  Event.findById(eventId)
    .populate('comments')
    .exec((err, event) => {
      if (err || !event) {
        return res.status(400).json({
          success: false,
          errorMessage: 'Event not found',
        });
      }

      const obj = new Comment({
        text: message,
        author: {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
        },
      });
      Comment.create(obj, (error, comment) => {
        if (error) {
          console.log('Comment create failed ', error);
          return res.status(400).json({
            success: false,
            errorMessage: 'Comment create failed',
          });
        }
        event.comments.push(comment);
        event.save((e, result) => {
          if (e) {
            console.log('Error in adding comment to event ', e);
            return res.status(400).json({
              success: false,
              errorMessage: 'Error in adding comment to event',
            });
          }
          return res.status(200).json({
            success: true,
            message: 'Successfully added the comment',
          });
        });
      });
    });
};

exports.editComment = (req, res) => {
  const { eventId, commentId } = req.params;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      errorMessage: 'Message is Required',
    });
  }

  Comment.findById(commentId).exec((err, comment) => {
    if (err || !comment) {
      return res.status(400).json({
        success: false,
        errorMessage: 'Comment not found',
      });
    }
    if (req.user._id !== comment.author._id) {
      return res.status(400).json({
        success: false,
        errorMessage: 'You do not have the right to edit this comment',
      });
    }
    const updatedComment = comment;
    updatedComment.text = message;
    updatedComment.save((error, result) => {
      if (error) {
        console.log('Error in saving edited comment ', error);
        return res.status(400).json({
          success: false,
          errorMessage: 'Error in saving edited comment',
        });
      }
      return res.status(200).json({
        success: true,
        successMessage: 'Successfully edited the comment',
      });
    });
  });
};

exports.deleteComment = (req, res) => {
  const { eventId, commentId } = req.params;
  Comment.findById(commentId).exec((err, comment) => {
    if (err || !comment) {
      return res.status(400).json({
        success: false,
        errorMessage: 'Comment not found',
      });
    }
    if (req.user._id.toString() !== comment.author._id.toString()) {
      return res.status(400).json({
        success: false,
        errorMessage: 'You do not have the right to delete this comment',
      });
    }

    comment.delete((error, result) => {
      if (error) {
        console.log('Error in deleting the comment ', error);
        return res.status(400).json({
          success: false,
          errorMessage: 'Error in deleting the comment',
        });
      }
      return res.status(200).json({
        success: true,
        successMessage: 'Successfully deleted the comment',
      });
    });
  });
};
