const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];

const dayValidationSchema = Joi.object({
    mealType: Joi.string().valid(...MEAL_TYPES.values()).required(),
    recipe: Joi.objectId().required(),
    dayNumber: Joi.number().min(1).max(14).required(),
})

exports.dayValidationSchema = dayValidationSchema;
