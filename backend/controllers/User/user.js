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

  User.findOne({ _id: req.user._id }, (err, user) => {
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
