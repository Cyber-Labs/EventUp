const nodemailer = require("nodemailer");

exports.sendEmail = (req, res) => {
    const senderEmail = require('../../config/keys').email;
    const senderPassword = require('../../config/keys').password;
    const receiverEmail = "aman.dwivedi5@gmail.com";
    const emailMessage = "This is a testing email !!!";

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: senderEmail,
          pass: senderPassword
        }
      });
  
    var mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: 'Test Email',
        text: emailMessage,
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent successfully' );
        }
    });    
};

