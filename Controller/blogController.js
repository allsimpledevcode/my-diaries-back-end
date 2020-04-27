const express = require('express');
const router = express.Router();
const Blog = require('../Model/blogModel');

router.get('/', function (req, res) {
  Blog.find({}, function (err, blogs) {
      if (err) return res.status(500).send("There was a problem finding the blogs.");
      res.status(200).send(blogs);
  });
});

router.get('/:id', function (req, res) {
  Blog.findById(req.params.id, function (err, blog) {
      if (err) return res.status(500).send("There was a problem finding the blog.");
      if (!blog) return res.status(404).send("No blog found.");
      res.status(200).send(blog);
  });
});

router.post('/', function (req, res) {
  Blog.create({
      title : req.body.title,
      content : req.body.content
  }, 
  function (err, blog) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(blog);
  });
});

router.put('/:id', function (req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, blog) {
      if (err) return res.status(500).send("There was a problem updating the blog.");
      res.status(200).send(blog);
  });
});

router.delete('/:id', function (req, res) {
  Blog.findByIdAndRemove(req.params.id, function (err, blog) {
      if (err) return res.status(500).send("There was a problem deleting the blog.");
      res.status(200).send("blog: "+ blog.title +" was deleted.");
  });
});


module.exports = router;