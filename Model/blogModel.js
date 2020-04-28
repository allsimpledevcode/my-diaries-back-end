const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4');

const BlogSchema = new Schema({  
  uuid: { type: 'string', default: uuidv4, unique: true },
  title: String,
  content: String
},{ versionKey: false });

BlogSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._id;
  return obj;
}

mongoose.model('blog', BlogSchema);

module.exports = mongoose.model('blog');