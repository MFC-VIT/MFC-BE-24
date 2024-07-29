const express = require('express');

const router = express.Router();

/**
 ** Demo User Routes
 * @READ [GET][/]
 * (to fetch list of all the users and their details)
 * 
 * @READ [GET][/:userId]
 * (to fetch single user details like username, email etc.)
 * 
 * @Update [PUT][/:userId]
 * (to update user details like username, email, password etc.)
 * 
 * middlewares (to verify login session, isAdmin etc..)
 */

module.exports = router;