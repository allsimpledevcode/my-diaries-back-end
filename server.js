require('./Config/db');

const express = require("express");
const bodyparser = require("body-parser");
const cors = require('cors');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const BlogController = require('./Controller/blogController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors({credentials: true, origin: true }));
app.options('*', cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/api/blogs', BlogController);
app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`running at port ${port}`);
});