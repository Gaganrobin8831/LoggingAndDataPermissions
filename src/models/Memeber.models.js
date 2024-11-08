const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: String,
    required: true,
    lowercase : true  
  }
},{timestamps:true});

const User = mongoose.model('User', userSchema);
module.exports = User;
