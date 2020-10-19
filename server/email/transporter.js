const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADD,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;
