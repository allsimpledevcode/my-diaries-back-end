const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 3200;

const BlogController = require('./Controller/blogController');
require('./Config/db');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/blogs', BlogController);



app.listen(port, () => {
  console.log(`running at port ${port}`);
});