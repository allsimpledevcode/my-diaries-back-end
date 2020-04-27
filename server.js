const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 3200;
const cors = require('cors');

const BlogController = require('./Controller/blogController');
require('./Config/db');

app.use(cors({credentials: true, origin: true }));
app.options('*', cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Working!!!'));
app.use('/blogs', BlogController);



app.listen(port, () => {
  console.log(`running at port ${port}`);
});