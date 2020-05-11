const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const TagSchema = new Schema({  
  name: String,
  slug_name: String
},{
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

TagSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('tag', TagSchema);