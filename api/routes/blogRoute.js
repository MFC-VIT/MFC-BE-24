
const express = require('express');
const {  createBlog, updateBlog, deleteBlog,getAllBlogs } = require('../controllers/blogController');
const { verifySession, isAdmin } = require('../middleware/authMiddleware');

// const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getAllBlogs);
router.post('/',verifySession,isAdmin, createBlog);
router.put('/:id',verifySession,isAdmin, updateBlog);
router.delete('/:id',verifySession,isAdmin, deleteBlog);

module.exports = router;


