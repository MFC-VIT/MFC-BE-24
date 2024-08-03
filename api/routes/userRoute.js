const express = require("express");

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
const userController = require("../controllers/adminController");
const {
  validateIsAdmin,
  validateToken,
} = require("../middleware/authMiddleware");
// Ensure to create this middleware

// Routes for user management
router.get("/", userController.getAllUsers);
router.get("/:userId", validateToken, validateIsAdmin, userController.getUser);
router.put(
  "/:userId",
  validateToken,
  validateIsAdmin,
  userController.updateUser
);
router.delete(
  "/:userId",
  validateToken,
  validateIsAdmin,
  userController.deleteUser
);

module.exports = router;
