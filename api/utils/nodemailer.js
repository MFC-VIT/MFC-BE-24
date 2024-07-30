// All the exports for utils can be defined here
// NodeMailer
// Zod (if you use, for schema validation)
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
 
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: 'ishaanagarwal1203@gmail.com',
      pass: 'hvlsjqjrlkbfyvqc'
    }
});

module.exports = transporter;
