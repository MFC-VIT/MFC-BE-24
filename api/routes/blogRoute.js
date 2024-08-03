const express = require("express");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  test,
} = require("../controllers/blogController");
const {
  verifySession,
  isAdmin,
  validateToken,
  validateIsAdmin,
} = require("../middleware/authMiddleware");

// const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// router.get("/", getAllBlogs);
router.post("/", validateToken, validateIsAdmin, createBlog);
router.put("/:id", validateToken, validateIsAdmin, updateBlog);
router.delete("/:id", verifySession, validateIsAdmin, deleteBlog);

module.exports = router;
