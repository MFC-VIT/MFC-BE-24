const Blog = require('../models/blogModel');

//http://localhost:3000/api/blogs/
exports.createBlog = async (req, res) => {
  try {
    console.log(req.body);
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//http://localhost:3000/api/blogs/{id}
exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//http://localhost:3000/api/blogs/{id}
exports.deleteBlog = async (req, res) => {
    // console.log(req.params.id)
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
