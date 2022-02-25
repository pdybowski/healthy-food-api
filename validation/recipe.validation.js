const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const { ingredientValidationSchema } = require("./ingredient.validation");
const { MEAL_TYPES } = require("../constants")

const validateRecipe = (recipe) => {
    const schema = Joi.object({
        author: Joi.objectId().required(),
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

module.exports = validateRecipe;
