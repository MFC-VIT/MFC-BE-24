// All the exports for utils can be defined here
// NodeMailer
// Zod (if you use, for schema validation)
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const transporter = nodemailer.createTransport({
 
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
});
const emailRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 3,
  message: "You have exceeded the 3 requests per day limit for sending emails",
  headers: true,
  keyGenerator: (req) => req.ip,
});

module.exports = {transporter,emailRateLimiter};
