const express = require("express");
require("dotenv").config();
const router = express.Router();
const { verifySession, isAdmin } = require("../middleware/authMiddleware"); 
const {
    googleAuth,
    googleCallback,
    login,
    logout,
} = require("../controllers/authControllers");

router.get('/google', googleAuth);

router.get('/google/redirect', googleCallback, login);

router.get('/logout', verifySession, logout);

router.get('/test', verifySession, (req, res) => {
    res.json({ message: 'This is a test route', user: req.user });
});

router.get('/test/admin', verifySession, isAdmin, (req, res) => {
    res.json({ message: 'This is a test route', user: req.user });
});


module.exports = router;