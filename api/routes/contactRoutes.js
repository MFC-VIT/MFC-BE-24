const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contact');
const {emailLimit} = require('../controllers/rateController')

router.post('/contact',emailLimit, sendContactEmail);

module.exports = router;
