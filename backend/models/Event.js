const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isPaid: {
      type: String,
      default: 'free',
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    isPublic: {
      type: String,
      default: 'public',
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    secureUrl: {
      type: String,
      trim: true,
      default: '',
    },
    appliedUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        deafult: [],
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
