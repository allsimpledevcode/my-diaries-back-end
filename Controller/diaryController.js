const Diary = require('../Model/diaryModel');

exports.getAllDiaries = (req, res) => {
  Diary.find({}).sort({updated_at: 'desc'}).exec(function (err, Diaries) {
      if (err) return res.status(500).send("There was a problem finding the Diaries.");
      res.status(200).send(Diaries);
  });
}

exports.createDiary = (req, res) => {
  Diary.create({
      title : req.body.title,
      content : req.body.content
  }, 
  function (err, blog) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(blog);
  });
};

exports.getDiary = (req, res) => {
  Diary.findById(req.params.id, function (err, blog) {
      if (err) return res.status(500).send("There was a problem finding the blog.");
      if (!blog) return res.status(404).send("No blog found.");
      res.status(200).send(blog);
  });
}

exports.updateDiary = (req, res) => { 
  Diary.findByIdAndUpdate(req.params.id , req.body, {new: true}, function (err, blog) {
      if (err) return res.status(500).send("There was a problem updating the blog.");
      res.status(200).send(blog);
  });
};

exports.deleteDiary = (req, res) =>  {
  Diary.findByIdAndDelete(req.params.id, function (err, blog) {
      if (err) return res.status(500).send("There was a problem deleting the blog.");
      res.status(200).send("blog: "+ blog.title +" was deleted.");
  });
};

