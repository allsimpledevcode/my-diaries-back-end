const express = require("express");
const bodyparser = require("body-parser");
const path = require('path')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const BlogController = require('./Controller/blogController');
require('./Config/db');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + './index.html'));
});

app.use(cors({credentials: true, origin: true }));
app.options('*', cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Working!!!'));
app.use('/blogs', BlogController);



app.listen(port, () => {
  console.log(`running at port ${port}`);
});