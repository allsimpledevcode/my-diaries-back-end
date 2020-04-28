const mongoose = require('mongoose');  

const BlogSchema = new mongoose.Schema({  
  title: String,
  content: String
},{ versionKey: false });

mongoose.model('blog', BlogSchema);

module.exports = mongoose.model('blog');