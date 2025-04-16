const express = require('express');
const router = express.Router();
const {emailRateLimiter} = require("../utils/nodemailer")
const { sendContactEmail } = require('../controllers/contact');
const {emailLimit} = require('../controllers/rateController')

router.post('/contact', emailRateLimiter, sendContactEmail);

module.exports = router;
