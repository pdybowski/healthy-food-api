const mongoose = require('mongoose');
const { Schema } = mongoose;
const { UNIT_TYPES } = require("../constants");

const ingredientSchema = Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  quantity: {
    number: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: UNIT_TYPES,
    },
  },
});

exports.ingredientSchema = ingredientSchema;
