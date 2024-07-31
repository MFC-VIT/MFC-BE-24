const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const verifySession = (req, res, next) => {
    const token = req.cookies.authToken;

    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
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

module.exports = {
    verifySession,
}