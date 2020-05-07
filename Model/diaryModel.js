const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const DiarySchema = new Schema({  
  title: String,
  content: String
},{ versionKey: false });


module.exports = mongoose.model('diary', DiarySchema);