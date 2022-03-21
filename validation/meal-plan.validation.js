const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const {dayValidationSchema} = require("./day.validation");

const validateMealPlan = (mealPlan) => {
    const schema = Joi.object({
        days: Joi.array().min(1).items(dayValidationSchema).required(),
        author: Joi.string().guid(),
        title: Joi.string().trim().max(20).required(),
        tags: Joi.array().items(Joi.string().max(10)),
        img: Joi.binary().encoding('base64'),
    })
    return schema.validate(mealPlan)
}

const validateUpdateMealPlan  = (mealPlan) => {
    const schema = Joi.object({
        days: Joi.array().min(1).items(dayValidationSchema).optional(),
        author: Joi.string().guid(),
        title: Joi.string().trim().max(20).optional(),
        tags: Joi.array().items(Joi.string().max(10)).optional(),
        img: Joi.binary().encoding('base64').optional(),
    })
    return schema.validate(mealPlan)
}

module.exports = {
    validateMealPlan,
    validateUpdateMealPlan};
