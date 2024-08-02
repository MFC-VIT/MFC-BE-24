const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const verifySession = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        User.findById(decoded.id)
            .then(user => {
                if (!user) {
                    return res.status(401).json({ error: 'User not found' });
                }
                next();
            })
            .catch(error => {
                return res.status(401).json({ error: 'Unauthorized' });
            });
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

const isAdmin = async (req, res, next)=>{
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (user.isAdmin){
            next();
        } else {
            return res.status(403).json({ error: 'Forbidden: You do not have administrative privileges' });
        }
    } catch(err){
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    verifySession,
    isAdmin,
}