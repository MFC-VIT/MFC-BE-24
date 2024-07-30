const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contact');

router.post('/contact', sendContactEmail);

module.exports = router;
