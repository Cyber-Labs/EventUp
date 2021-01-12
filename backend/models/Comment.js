const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    text: String,
    author: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      name: String,
      email: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
