const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

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

DiarySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('diary', DiarySchema);