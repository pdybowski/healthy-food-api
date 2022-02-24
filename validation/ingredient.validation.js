const Joi = require("joi");
const { UNIT_TYPES } = require("../constants")

const ingredientValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    quantity: Joi.object({
        number: Joi.number().min(0).required(),
        unit: Joi.string().valid(...UNIT_TYPES.values()).required(),
    }).required()
})

exports.ingredientValidationSchema = ingredientValidationSchema;
