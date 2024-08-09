const express = require('express');
const { transporter, emailRateLimiter } = require('../utils/nodemailer');
exports.emailLimit = [ emailRateLimiter, (req, res) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ success: false, message: 'Failed to send email' });
        }
        res.status(200).send({ success: true, message: 'Email sent successfully', info });
    });
}];