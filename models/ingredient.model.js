const mongoose = require('mongoose');
const Joi = require('joi');
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

const ingredientValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    quantity: Joi.object({
      number: Joi.number().min(0).required(),
      unit: Joi.string().valid(...UNIT_TYPES.values()).required(),
    }).required()
  })

exports.ingredientSchema = ingredientSchema;
exports.ingredientValidationSchema = ingredientValidationSchema;