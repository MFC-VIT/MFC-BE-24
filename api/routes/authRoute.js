const express = require("express");

const router = express.Router();

/**
 ** Auth Routes
 * 
 * @Login [POST][/login]
 * request->{ username/email, password }
 * (This will fetch the user from db if it exists)
 * 
 * @Signup [POST][/signup]
 * request-> { username, email, password }
 * (This route is responsible for creating the user in db)
 * 
 * Status Codes: { 200: Success, 201: User Created, 400: Bad Request, 401: Unauthorised, 404: User note found, 500: Internal Server Error }
 * 
 */


module.exports = router;