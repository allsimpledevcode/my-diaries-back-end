const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema({  
  name : { 
    type : String, 
    required : true
  }, 
  email : { 
      type : String, 
      required : true
  }, 
  isVerified: { type: Boolean, default: false },
  hash : String, 
  salt : String 
},{
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

UserSchema.methods.setPassword = function(password) {      
  this.salt = crypto.randomBytes(16).toString('hex'); 
  this.hash = crypto.pbkdf2Sync(password, this.salt,  
  1000, 64, `sha512`).toString(`hex`); 
}; 
   

UserSchema.methods.validPassword = function(password) { 
  var hash = crypto.pbkdf2Sync(password,  
  this.salt, 1000, 64, `sha512`).toString(`hex`); 
  return this.hash === hash; 
}; 

module.exports = mongoose.model('user', UserSchema);