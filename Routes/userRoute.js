const express = require('express');
const routers = express.Router();
const userController = require('../Controller/userController');

routers
  .route("/signup")
  .post(userController.createNewUser);

routers
  .route("/login")
  .post(userController.authExistUser);


module.exports = routers;