const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    const updatedUser = user;
    updatedUser.hashed_password = undefined;
    updatedUser.salt = undefined;
    res.json(updatedUser);
  });
};

exports.update = (req, res) => {
  const { role, name, password, email } = req.body;

  User.findById(req.user._id, (err, user) => {
    // console.log(user);
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
      });
    }
    const savedUser = user;
    savedUser.name = name;

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: 'Password should be min 6 characters long',
        });
      }
      savedUser.password = password;
    }

    savedUser.save((error, updatedUser) => {
      if (error) {
        console.log('USER UPDATE ERROR', error);
        return res.status(400).json({
          error: 'User update failed',
        });
      }
      const responseUser = updatedUser;
      responseUser.hashed_password = undefined;
      responseUser.salt = undefined;
      res.json(responseUser);
    });
  });
};

exports.getRegisteredEvents = (req, res) => {
  const usertoken = req.headers.authorization;
  console.log('usertoken ', usertoken);
  const token = usertoken.split(' ');
  const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
  console.log('decoded ', decoded);
  const userId = decoded._id;

  User.findById(userId)
    .populate('registeredEvents')
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User not found',
        });
      }
      const { registeredEvents } = user;
      res.json(registeredEvents);
    });
};

exports.getCreatedEvents = (req, res) => {
  const usertoken = req.headers.authorization;
  console.log('usertoken ', usertoken);
  const token = usertoken.split(' ');
  const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
  console.log('decoded ', decoded);
  const userId = decoded._id;
  User.findById(userId)
    .populate('createdEvents')
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User not found',
        });
      }
      const { createdEvents } = user;
      res.json(createdEvents);
    });
};
