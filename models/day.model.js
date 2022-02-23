const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const {Schema} = mongoose;

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];

const daySchema = Schema({
    mealType: {
        type: String,
        lowercase: true,
        enum: MEAL_TYPES,
        required: true
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    dayNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 14,
    },
});

const dayValidationSchema = Joi.object({
        mealType: Joi.string().valid(...MEAL_TYPES.values()).required(),
        recipe: Joi.objectId().required(),
        dayNumber: Joi.number().min(1).max(14).required(),
})

exports.daySchema = daySchema;
exports.dayValidationSchema = dayValidationSchema;

