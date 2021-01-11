const Event = require('../../models/Event');
const Comment = require('../../models/Comment');

exports.showComment = (req, res) => {
    const eventId = req.params.eventId;
    Event.findById(eventId).populate("comments").exec((err, event) => {
        if (err || !event) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Event not found'
            });
        }
        else {
            res.json({
                success: true,
                successMessage: 'Successfully found all the comments',
                data: event.comments
            })
        }
    });
};

exports.createComment = (req, res) => {
    const eventId = req.params.eventId;
    const {message} = req.body;

    if (!message) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Message is Required'
        });
    }

    Event
        .findById(eventId)
        .populate("comments")
        .exec((err, event) => {
            if (err || !event) {
                return res.status(400).json({
                    success: false,
                    errorMessage: 'Event not found'
                });
            }
            else {
                let obj = new Comment ({
                    text: message,
                    author: {
                        _id: req.user._id,
                        name: req.user.name,
                        email: req.user.email,
                    }
                });
                Comment.create(obj, function(err, comment){
                    if(err) {
                        console.log('Comment create failed ', err);
                        return res.status(400).json({
                            success: false,
                            errorMessage: 'Comment create failed'
                        });
                    }      
                    else {
                        event.comments.push(comment);
                        event.save(function(err, result) {
                            if(err) {
                                console.log("Error in adding comment to event ", err);
                                return res.status(400).json({
                                    success: false,
                                    errorMessage: 'Error in adding comment to event'
                                });
                            }
                            else {
                                return res.status(200).json({
                                    success: true,
                                    successMessage: 'Successfully added the comment'
                                });
                            }
                        });
                    }
                })
            }
        });
};


exports.editComment = (req, res) => {
    const { eventId, commentId } = req.params;
    const {message} = req.body;

    if (!message) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Message is Required'
        });
    }

    Comment
    .findById(commentId)
    .exec((err, comment) => {
        if (err || !comment) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Comment not found'
            });
        }
        else if (req.user._id !== comment.author._id) {
            return res.status(400).json({
                success: false,
                errorMessage: 'You do not have the right to edit this comment'
            });
        }
        else {
            comment.text = message;
            comment.save(function(err, result) {
                if(err) {
                    console.log("Error in saving edited comment ", err);
                    return res.status(400).json({
                        success: false,
                        errorMessage: 'Error in saving edited comment'
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        successMessage: 'Successfully edited the comment'
                    });
                }
            });
        }
    });

};

exports.deleteComment = (req, res) => {
    const { eventId, commentId } = req.params;
    Comment
    .findById(commentId)
    .exec((err, comment) => {
        if (err || !comment) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Comment not found'
            });
        }
        else if (req.user._id.toString() !== comment.author._id.toString()) {
            return res.status(400).json({
                success: false,
                errorMessage: 'You do not have the right to delete this comment'
            });            
        }
        else {
            comment.delete(function(err, result) {
                if(err) {
                    console.log("Error in deleting the comment ", err);
                    return res.status(400).json({
                        success: false,
                        errorMessage: 'Error in deleting the comment'
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        successMessage: 'Successfully deleted the comment'
                    });
                }
            });
        }
    });
};
