const express = require('express');
const {emailLimit} = require('../controllers/rateController')
const router = express.Router();

router.post("/send-mail",emailLimit)
module.exports = router;