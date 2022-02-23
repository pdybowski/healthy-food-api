const mongoose = require('mongoose');
const Joi = require("joi");
const { Schema } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
    required: true
  },
  surname: {
    type: String,
    lowercase: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
    required: true
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    minlength: 2,
    maxlength: 10,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    maxlength: 20,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    maxlength: 255,
    unique: true,
    index: true,
    required: true
  },
  phoneNumber: {
    type: String,
    lowercase: true,
    trim: true,
    maxlength: 12,
    unique: true,
    index: true,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(20).required(),
    surname: Joi.string().trim().min(2).max(20).required(),
    username: Joi.string().trim().min(2).max(10).required(),
    password: Joi.string().min(8).max(20).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().trim().regex(/^[0-9]{9,12}$/).required(),
    isAdmin: Joi.boolean(),
  })
  return schema.validate(user)
}

module.exports = {
  User,
  validateUser: validateUser,
};