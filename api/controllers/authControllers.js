const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../config/googleAuth");

const failureRedirect = process.env.FAILURE_REDIRECT_URL;
const logoutRedirect = process.env.LOGOUT_REDIRECT_URL;
const loginRedirect = process.env.LOGIN_REDIRECT_URL;

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
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(token);
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.redirect(loginRedirect);
    }
  };