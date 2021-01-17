const jwt = require('jsonwebtoken');
const Event = require('../../models/Event');
const User = require('../../models/User');

exports.create = (req, res) => {
  const {
    name,
    about,
    date,
    isPaid,
    price,
    isPublic,
    creator,
    secureUrl,
  } = req.body;

  // Validation Starts
  console.log(req.body);
  const textFormat = /[a-z A-Z0-9]+$/;
  if (name === null || name === undefined) {
    return res.status(400).json({
      error: 'Name is required',
    });
  }
  if (!textFormat.test(name)) {
    return res.status(400).json({
      error: 'Name should not contain symbols',
    });
  }
  if (about === null || about === undefined) {
    return res.status(400).json({
      error: 'About is required',
    });
  }
  if (date === null || date === undefined) {
    console.log('Date is required');
    return res.status(400).json({
      error: 'Date is required',
    });
  }
  if (isPaid === null || isPaid === undefined) {
    console.log('Select paid or free option');
    return res.status(400).json({
      error: 'Select paid or free option',
    });
  }
  if (!(isPaid === 'free' || isPaid === 'paid')) {
    console.log('Select paid or free option');
    return res.status(400).json({
      error: 'Select paid or free option',
    });
  }
  if (price === null || price === undefined) {
    console.log('Price is required');
    return res.status(400).json({
      error: 'Price is required',
    });
  }
  if (isPublic === null || isPublic === undefined) {
    console.log('Select public or private option');
    return res.status(400).json({
      error: 'Select public or private option',
    });
  }
  if (!(isPublic === 'public' || isPublic === 'private')) {
    return res.status(400).json({
      error: 'Select public or private option',
    });
  }
  if (creator === null || creator === undefined || !textFormat.test(creator)) {
    console.log('Please login to continue');
    return res.status(400).json({
      error: 'Please login to continue',
    });
  }
  if (secureUrl === null || secureUrl === undefined) {
    return res.status(400).json({
      error: 'Image Upload is required',
    });
  }
  console.log('Cleared validation');

  // Create a new event
  const obj = new Event({
    name,
    about,
    date,
    isPaid,
    price,
    isPublic,
    creator,
    secureUrl,
  });

  Event.create(obj, (err, item) => {
    if (err) {
      console.log('Event create failed ', err);
      return res.status(400).json({
        error: 'Event create failed',
      });
    }
    User.findById(creator).exec((error, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User not found',
        });
      }
      if (user.createdEvents.indexOf(obj._id) < 0) {
        const updatedUser = user;
        updatedUser.createdEvents.push(obj._id);
        User.findByIdAndUpdate(
          creator,
          { $set: updatedUser },
          { new: true },
          (e, result) => {
            if (e) {
              console.log(e);
              return res.status(400).json({
                error: 'Failed to add event id in user details',
              });
            }
            console.log('Succesfully created event');
            res.json({
              success: true,
              message: 'Successfully created event',
            });
          }
        );
      } else {
        console.log('Succesfully created event');
        res.json({
          success: true,
          message: 'Successfully created event',
        });
      }
    });
  });
};

exports.read = (req, res) => {
  const { eventId } = req.params;
  Event.findById(eventId).exec((err, event) => {
    if (err || !event) {
      return res.status(400).json({
        error: 'Event not found',
      });
    }

    res.json(event);
  });
};

exports.update = (req, res) => {
  const { eventId } = req.params;
  const { name, about, date, isPaid, price, isPublic, creator } = req.body;

  // Validation
  if (!name) {
    return res.status(400).json({
      error: 'Name is required',
    });
  }
  if (!about) {
    return res.status(400).json({
      error: 'About is required',
    });
  }
  if (!date) {
    return res.status(400).json({
      error: 'Date is required',
    });
  }
  if (!isPaid) {
    return res.status(400).json({
      error: 'Select paid or free',
    });
  }
  if (!price) {
    return res.status(400).json({
      error: 'Price is required',
    });
  }
  if (!isPublic) {
    return res.status(400).json({
      error: 'Select public or private',
    });
  }
  if (!creator) {
    return res.status(400).json({
      error: 'Login is required',
    });
  }

  const obj = new Event({
    name,
    about,
    date,
    isPaid,
    price,
    isPublic,
    creator,
  });

  Event.findByIdAndUpdate(
    eventId,
    { $set: obj },
    { new: true },
    (err, item) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: 'Event update failed',
        });
      }
      console.log('Succesfully updated event');
      res.json(item);
    }
  );
};

exports.EventPageCount = (req, res) => {
  Event.countDocuments({}, (error, eventCount) => {
    if (error) {
      console.log('Error in finding pageCount ', error);
      return res.status(400).json({
        error: 'Error in finding pageCount',
      });
    }
    const eventsPerPage = 5;
    const pageCount = Math.ceil(eventCount / eventsPerPage);
    res.json(pageCount);
  });
};

exports.EventPageData = (req, res) => {
  // const usertoken = req.headers.authorization;
  // console.log('usertoken ', usertoken);
  // const token = usertoken.split(' ');
  // const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
  // console.log('decoded ', decoded);

  const pageNumber = req.params.pagenumber;
  const eventsPerPage = 5;
  Event.find({})
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * eventsPerPage)
    .limit(eventsPerPage)
    .exec((err, doc) => {
      if (err) {
        return res.status(400).json({
          error: 'Error in finding events',
        });
      }

      res.json(doc);
    });
};

exports.joinEvent = (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;
  console.log('eventId', eventId);
  console.log('userId ', userId);
  // Validation
  if (!userId) {
    return res.status(400).json({
      error: 'userId is required',
    });
  }

  Event.findById(eventId).exec((err, prevEvent) => {
    if (err || !prevEvent) {
      return res.status(400).json({
        error: 'Event not found',
      });
    }
    if (prevEvent.appliedUser.indexOf(userId) >= 0) {
      console.log('Already joined the event');
      return res.json({
        success: true,
        message: 'Already joined the event',
      });
    }

    const updatedEvent = prevEvent;
    updatedEvent.appliedUser.push(userId);
    Event.findByIdAndUpdate(
      eventId,
      { $set: updatedEvent },
      { new: true },
      (error, item) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            error: 'Event update failed',
          });
        }
      }
    );

    User.findById(userId).exec((e, prevUser) => {
      if (e || !prevUser) {
        return res.status(400).json({
          error: 'User not found',
        });
      }

      const updatedUser = prevUser;
      updatedUser.registeredEvents.push(eventId);
      User.findByIdAndUpdate(
        userId,
        { $set: updatedUser },
        { new: true },
        (error, item) => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              error: 'User update failed',
            });
          }
        }
      );
    });

    res.json({
      success: true,
      message: 'Successfully joined the event',
    });
  });
};

exports.getAllEvents = (req, res) => {
  Event.find({}).exec((err, doc) => {
    if (err) {
      return res.status(400).json({
        error: 'Error in finding events',
      });
    }
    res.json(doc);
  });
};
