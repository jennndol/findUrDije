const express = require('express');
const app = express();
const mailer = require('express-mailer');
app.set('view engine', 'ejs');

mailer.extend(app, {
  from: 'findUrDije@gmail.com',
  host: 'smtp.gmail.com',
  secureConnection: true,
  port: 465,
  transportMethod: 'SMTP',
  auth: {
    user: 'findUrDije@gmail.com',
    pass: 'Hacktiv8Super'
  }
});

let emailSender = (obj) => {
  app.mailer.send('email', {
    to: obj.email,
    subject: obj.subject,
    message: obj.message
  }, function(err) {
    if (err) {
      return 'There was an error sending the email';
    }
    return 'Email Sent';
  });
}

module.exports = emailSender;
