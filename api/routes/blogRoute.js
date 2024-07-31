
const express = require('express');
const {  createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
// const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// router.get('/', getAllBlogs);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;


