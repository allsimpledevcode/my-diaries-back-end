const Diary = require('../Model/diaryModel');

const myCustomLabels = {
  totalDocs: 'totalCount',
  docs: 'diaries',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  meta: 'meta'
};


exports.getAllDiaries = (req, res) => {
  const { page, perPage, query } = req.query;
  const options = {
    page: parseInt(page, 3) || 1,
    limit: parseInt(perPage, 3) || 3,
    sort: { 'updated_at': -1 },
    customLabels: myCustomLabels
  };
  
  Diary.paginate({ title: {$regex: query || '', $options: "i" } } , options, function (err, Diaries) {
      if (err) return res.status(500).send("There was a problem finding the Diaries.");
      res.status(200).send(Diaries);
  });
}

exports.getAllFavouritesDiaries = (req, res) => {
  const { page, perPage, query } = req.query;
  const options = {
    page: parseInt(page, 3) || 1,
    limit: parseInt(perPage, 3) || 3,
    sort: { 'updated_at': -1 },
    customLabels: myCustomLabels
  };
  Diary.paginate({ title: {$regex: query || '', $options: "i" } }, { favorite: true }, options, function (err, Diaries) {
      if (err) return res.status(500).send("There was a problem finding the Diaries.");
      res.status(200).send(Diaries);
  });
}

exports.getDiariesByTag = (req, res) => {
  Diary.paginate({ tags: req.params.id }, options, function (err, Diaries) {
      if (err) return res.status(500).send("There was a problem finding the Diaries.");
      res.status(200).send(Diaries);
  });
}

exports.createDiary = (req, res) => {
  Diary.create({
      title : req.body.title,
      content : req.body.content,
      favorite: req.body.favorite,
      tags: req.body.tags
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

