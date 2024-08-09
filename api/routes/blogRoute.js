const express = require("express");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  test,
} = require("../controllers/blogcontroller");
const {
  verifySession,
  isAdmin,
  validateToken,
  validateIsAdmin,
} = require("../middleware/authMiddleware");

// const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/", getAllBlogs);
router.post("/:id", validateToken, validateIsAdmin, createBlog);
router.put("/:id/:blogid", validateToken, validateIsAdmin, updateBlog);
router.delete("/:id/:blogid", validateToken, validateIsAdmin, deleteBlog);

module.exports = router;
