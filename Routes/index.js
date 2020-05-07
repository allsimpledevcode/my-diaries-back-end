const express = require("express");
const routers = express.Router();
const blogRoutes = require('./blogRoute');
const diaryRoutes = require('./diaryRoute');

routers.use("/api/blogs", blogRoutes);
routers.use("/api/diaries", diaryRoutes);

module.exports = routers;
