const mongoose = require('mongoose');
const { Schema } = mongoose;

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];

const daySchema = Schema({
  mealType: {
    type: String,
    required: true,
    lowercase: true,
    enum: MEAL_TYPES,
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
  },
  dayNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 14,
  },
});

exports.daySchema = daySchema;
