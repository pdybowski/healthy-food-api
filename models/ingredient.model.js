const mongoose = require('mongoose');
const { Schema } = mongoose;
const UNIT_TYPES = [
  'kg',
  'g',
  'ml',
  'pcs',
  'tablespoon',
  'teaspoon',
  'cup',
  'pinch',
  'slice',
];

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
