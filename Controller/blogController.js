const Blog = require('../Model/blogModel');

exports.getAllBlogs = (req, res) => {
  Blog.find({}, function (err, blogs) {
      if (err) return res.status(500).send("There was a problem finding the blogs.");
      res.status(200).send(blogs);
  });
}

exports.createBlog = (req, res) => {
  Blog.create({
      title : req.body.title,
      content : req.body.content
  }, 
  function (err, blog) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(blog);
  });
};

exports.getBlog = (req, res) => {
  Blog.findOne({"uuid": req.params.id}, function (err, blog) {
      if (err) return res.status(500).send("There was a problem finding the blog.");
      if (!blog) return res.status(404).send("No blog found.");
      res.status(200).send(blog);
  });
}

exports.updateBlog = (req, res) => {
  Blog.findOneAndUpdate({uuid: req.params.id}, req.body, {new: true}, function (err, blog) {
      if (err) return res.status(500).send("There was a problem updating the blog.");
      res.status(200).send(blog);
  });
};

exports.deleteBlog = (req, res) =>  {
  Blog.findOneAndRemove({uuid: req.params.id}, function (err, blog) {
      if (err) return res.status(500).send("There was a problem deleting the blog.");
      res.status(200).send("blog: "+ blog.title +" was deleted.");
  });
};

