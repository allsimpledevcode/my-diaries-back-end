// User.js
const mongoose = require('mongoose');  

const UserSchema = new mongoose.Schema({  
  title: String,
  content: String
});

mongoose.model('blog', UserSchema);

module.exports = mongoose.model('blog');