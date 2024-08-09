const express = require("express");

const router = express.Router();

const userController = require("../controllers/adminController");
const {
  validateIsAdmin,
  validateToken,
} = require("../middleware/authMiddleware");
// Ensure to create this middleware

// Routes for user management
router.get("/:id", validateToken, validateIsAdmin, userController.getAllUsers);
// router.get("/:userId", validateToken, validateIsAdmin, userController.getUser);
// router.put(
//   "/:id",
//   validateToken,
//   validateIsAdmin,
//   userController.updateUser
// );
// router.delete(
//   "/:id",
//   validateToken,
//   validateIsAdmin,
//   userController.deleteUser
// );

module.exports = router;
