const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../../models/User');

exports.verifyJwtToken = (req, res, next) => {
  try {
    const usertoken = req.headers.authorization;
    // console.log("usertoken ", usertoken);
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
    // console.log("decoded ", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Error in verifying jwt token ', error);
    return res.status(400).json({
      success: false,
      errorMessage: 'Error in verifying jwt token',
    });
  }
};

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      console.log('Email is taken');
      return res.status(400).json({
        error: 'Email is taken',
      });
    }
    if (err) {
      console.log("Error Occured in finding user'");
      return res.status(400).json({
        error: 'Error Occured in finding user',
      });
    }

    const newUser = new User({ name, email, password });
    console.log(newUser);

    newUser.save((error, success) => {
      if (err) {
        console.log('SIGNUP ERROR', error);
        return res.status(400).json({
          error: err,
        });
      }

      return res.json({
        success: true,
        successMessage: 'Successfully registered! Please Login',
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  // console.log("req", req);

  // const senderEmail = require('../../config/keys').email;
  // const senderPassword = require('../../config/keys').password;
  // const receiverEmail = ["aman.dwivedi5@gmail.com","help.eventup@gmail.com" ];
  // const emailMessage = "This is a testing email !!!";

  // var transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: senderEmail,
  //       pass: senderPassword
  //     }
  //   });

  // var mailOptions = {
  //     from: senderEmail,
  //     to: receiverEmail,
  //     subject: 'Test Email',
  //     text: emailMessage,
  // };

  // transporter.sendMail(mailOptions, function(error, info){
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent successfully' );
  //     }
  // });

  // check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please signup',
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match',
      });
    }

    // generate a token and send to client
    const { _id, name } = user;
    const token = jwt.sign({ _id, name, email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.json({
      token,
      user: { _id, name, email },
    });
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});
