const express = require('express');
const routers = express.Router();
const DiaryController = require('../Controller/diaryController');

routers
  .route("/")
  .get(DiaryController.getAllDiaries)
  .post(DiaryController.createDiary);


routers
  .route("/favourites")
  .get(DiaryController.getAllFavouritesDiaries)

routers
  .route("/tags/:id")
  .get(DiaryController.getDiariesByTag)

routers
  .route("/:id")
  .get(DiaryController.getDiary)
  .put(DiaryController.updateDiary)
  .delete(DiaryController.deleteDiary);

module.exports = routers;