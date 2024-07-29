const express = require("express");

const router = express.Router();

/**
 * *Demo Blog Routes
 * @GetAllBlogs [GET][/all]
 * (to fetch all the blogs)(pagination, descending order of createdAt)
 * 
 * # Admin Routes
 * @GetBlog [GET][/:blogId]
 * (to fetch a specific blog(title, body, author, etc))
 * 
 * @GetBlogs [GET][/]
 * (to fetch the blogs writter by the currently logged in admin)(pagination, descending order of createdAt)
 * 
 * @PostBlog [POST][/]
 * (to create a blog post)
 * 
 * @UpdateBlog [PUT][/:blogId]
 * (to update a blog)
 * 
 * @DeleteBlog [DELETE][/:blogId]
 * (to delete the blog)
 * 
 * middlewares (to verify login, isAdmin, etc);
 * 
 */

module.exports = router;