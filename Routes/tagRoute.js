const express = require('express');
const routers = express.Router();
const TagController = require('../Controller/tagController');

routers
  .route("/")
  .get(TagController.getAllTags)
  .post(TagController.createTag);

routers
  .route("/:id")
  .get(TagController.getTag)
  .put(TagController.updateTag)
  .delete(TagController.deleteTag);

module.exports = routers;