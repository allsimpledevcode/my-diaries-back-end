const express = require("express");
const routers = express.Router();
const blogRoutes = require('./blogRoute');
const diaryRoutes = require('./diaryRoute');
const tagRoutes = require('./tagRoute');
const userRoutes = require('./userRoute');

routers.use("/api/blogs", blogRoutes);
routers.use("/api/diaries", diaryRoutes);
routers.use("/api/tags", tagRoutes);

routers.use("/user", userRoutes);

module.exports = routers;
