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
  }
},{timestamps:true});

const User = mongoose.model('User', userSchema);
module.exports = User;
