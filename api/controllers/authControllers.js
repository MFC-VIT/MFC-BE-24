const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../config/googleAuth");

const failureRedirect = 'http://localhost:3000/api/auth/test';
const logoutRedirect = 'http://localhost:3000';
const loginRedirect = 'http://localhost:3000/api/auth/test';

module.exports = {
    googleAuth: passport.authenticate("google", {
      scope: ["profile", "email"],
    }),

    googleCallback: passport.authenticate("google", {
        session: false,
        failureRedirect,
    }),

    logout: async (req, res, next) => {
      req.logout(()=>{
        res.clearCookie('authToken');
        res.redirect(logoutRedirect);
      });
    },

    login: (req, res)=>{
        const token = jwt.sign({ id: req.user.id },'ISHAAN', { expiresIn: '1d' });
        console.log(token);
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.redirect(loginRedirect);
    }
  };