const express = require('express');
const routers = express.Router();
const BlogController = require('../Controller/blogController');

routers
  .route("/")
  .get(BlogController.getAllBlogs)
  .post(BlogController.createBlog);

routers
  .route("/:id")
  .get(BlogController.getBlog)
  .put(BlogController.updateBlog)
  .delete(BlogController.deleteBlog);

module.exports = routers;