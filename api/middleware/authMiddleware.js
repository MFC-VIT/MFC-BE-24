const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

// const verifySession = (req, res, next) => {
//   const token = req.cookies.authToken;
//   console.log(token);
//   if (!token) {
//     return res.status(401).json({ error: "No token provided" });
//   }
//   try {
//     const decoded = jwt.verify(token, jwtSecret);
//     req.user = decoded;

//     User.findById(decoded.id)
//       .then((user) => {
//         if (!user) {
//           return res.status(401).json({ error: "User not found" });
//         }
//         next();
//       })
//       .catch((error) => {
//         return res.status(401).json({ error: "Unauthorized" });
//       });
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "User is not authorized or token missing" });
  }

  token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "User is not authorized" });
      }
      if (!decoded || !decoded.id) {
        return res.status(401).json({ message: "Invalid token payload" });
      }
      const userId = decoded.id;
      if (req.params.id !== userId) {
        return res
          .status(403)
          .json({ message: "Unauthorized access to user data" });
      }
      req.userId = userId;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

const validateIsAdmin = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "User is not authorized or token missing" });
  }

  token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "User is not authorized" });
      }
      if (!decoded || !decoded.id) {
        return res.status(401).json({ message: "Invalid token payload" });
      }
      const userId = decoded.id;
      const isAdmin = decoded.isAdmin;

      if (!isAdmin) {
        return res.status(403).json({ message: "User is not an admin" });
      }

      req.userId = userId;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        error: "Forbidden: You do not have administrative privileges",
      });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  validateToken,
  validateIsAdmin,
  isAdmin,
};
