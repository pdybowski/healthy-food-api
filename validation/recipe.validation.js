const Joi = require("joi");

const { ingredientValidationSchema } = require("./ingredient.validation");
const { MEAL_TYPES } = require("../constants")

const validateRecipe = (recipe) => {
    const schema = Joi.object({
        author: Joi.string().guid(),
        title: Joi.string().trim().max(100).required(),
        tags: Joi.array().items(Joi.string().max(10)),
        time: Joi.number().min(0).max(300),
        mealType: Joi.array().min(1).items(Joi.string().valid(...MEAL_TYPES.values())).required(),
        ingredients: Joi.array().min(1).items(ingredientValidationSchema).required(),
        description: Joi.string().max(5000),
        recipe: Joi.string().max(5000),
        img: Joi.binary().encoding('base64'),
        peopleNumber: Joi.number().min(0).max(100),
        isFavourite: Joi.boolean(),
        favouriteC: Joi.number(),
    })
    return schema.validate(recipe)
}

const validatePatchRecipe = (recipe) => {
    const schema = Joi.object({
        author: Joi.string().guid(),
        title: Joi.string().trim().max(100).optional(),
        tags: Joi.array().items(Joi.string().max(10)).optional(),
        time: Joi.number().min(0).max(300).optional(),
        mealType: Joi.array().min(1).items(Joi.string().valid(...MEAL_TYPES.values())).optional(),
        ingredients: Joi.array().min(1).items(ingredientValidationSchema).optional(),
        description: Joi.string().max(5000).optional(),
        recipe: Joi.string().max(5000).optional(),
        img: Joi.binary().encoding('base64').optional(),
        peopleNumber: Joi.number().min(0).max(100).optional(),
        isFavourite: Joi.boolean().optional(),
        favouriteC: Joi.number().optional(),
    })
    return schema.validate(recipe)
}

module.exports = {
    validateRecipe,
    validatePatchRecipe};
