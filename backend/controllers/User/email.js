const nodemailer = require('nodemailer');
const senderEmail = require('../../config/keys').email;
const senderPassword = require('../../config/keys').password;

exports.sendEmail = (req, res) => {
  const receiverEmail = 'aman.dwivedi5@gmail.com';
  const emailMessage = 'This is a testing email !!!';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: receiverEmail,
    subject: 'Test Email',
    text: emailMessage,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent successfully');
    }
  });
};
