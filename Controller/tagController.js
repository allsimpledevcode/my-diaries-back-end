const Tag = require('../Model/tagModel');

const myCustomLabels = {
  totalDocs: 'totalCount',
  docs: 'tags',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount'
};


exports.getAllTags = (req, res) => {
  const { page, perPage } = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    sort: { 'updated_at': -1 },
    customLabels: myCustomLabels
  };
  Tag.paginate({}, options, function (err, Tags) {
      if (err) return res.status(500).send("There was a problem finding the Tags.");
      res.status(200).send(Tags);
  });
}

exports.createTag = (req, res) => {
  Tag.create({
      name : req.body.name,
      slug_name : req.body.slug_name
  }, 
  function (err, tag) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(tag);
  });
};

exports.getTag = (req, res) => {
  Tag.findById(req.params.id, function (err, tag) {
      if (err) return res.status(500).send("There was a problem finding the Tag.");
      if (!tag) return res.status(404).send("No tag found.");
      res.status(200).send(tag);
  });
}

exports.updateTag = (req, res) => { 
  Tag.findByIdAndUpdate(req.params.id , req.body, {new: true}, function (err, tag) {
      if (err) return res.status(500).send("There was a problem updating the Tag.");
      res.status(200).send(tag);
  });
};

exports.deleteTag = (req, res) =>  {
  Tag.findByIdAndDelete(req.params.id, function (err, tag) {
      if (err) return res.status(500).send("There was a problem deleting the Tag.");
      res.status(200).send("tag: "+ tag.title +" was deleted.");
  });
};

