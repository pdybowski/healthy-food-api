const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  surname: {
    type: String,
    lowercase: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    minlength: 2,
    maxlength: 10,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    maxlength: 20,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    maxlength: 255,
    unique: true,
    index: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    lowercase: true,
    trim: true,
    maxlength: 12,
    unique: true,
    index: true,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
