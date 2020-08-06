const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    let error = {};
    error.errorfound = false; 

    User.findOne({ email }).exec((err, user) => {
        if (user && error.errorfound === false) {
            error.errorfound = true; 
            return res.status(400).json({
                error: 'Email is taken',
                message: ''
            });
        }
        else if (err && error.errorfound === false) {
            error.errorfound = true; 
            return res.status(400).json({
                error: 'Error Occured in finding user',
                message: ''
            });
        }
    });

    let newUser = new User({ name, email, password });
    console.log(newUser);

    newUser.save((err, success) => {
        if (err) {
            console.log('SIGNUP ERROR', err);            
            if(error.errorfound === false) {
                error.errorfound = true; 
                return res.status(400).json({
                    error: err,
                    message: ''
                });
            }
        }
        if(error.errorfound === false) {
            res.json({
                message: 'Signup success! Please signin',
                error: ''
            });
        }
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    // check if user exist
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { _id, name, email } = user;

        return res.json({
            token,
            user: { _id, name, email }
        });
    });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['RS256']
});