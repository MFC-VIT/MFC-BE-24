const express = require("express");
const passport = require("passport");
require("../config/googleAuth");
const router = express.Router();
const jwt = require("jsonwebtoken");
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

router.get('/google', passport.authenticate("google", {
    scope: ['profile', 'email']
}))

router.get('/google/redirect', passport.authenticate('google', { session: false }), (req, res)=>{
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log(token);
    res.cookie('authToken', token, {
        httpOnly: true, // Prevent access via JavaScript
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    return res.json({token});
})

const authenticate = (req, res, next) => {
    const token = req.cookies.authToken;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next()
        } catch (error) {
            console.error('Invalid token:', error);
            res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
};

router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});


module.exports = router;