const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const DiarySchema = new Schema({  
  title: String,
  content: String,
  favorite: {
    type: 'boolean', default: false
  }
},{
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports = mongoose.model('diary', DiarySchema);