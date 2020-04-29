const express = require("express");
const routers = express.Router();
const blogRoutes = require('./blogRoute');

routers.use("/api/blogs", blogRoutes);

module.exports = routers;
