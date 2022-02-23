const mongoose = require("mongoose");
const {Schema} = mongoose;
const {ingredientSchema, ingredientValidationSchema} = require("./ingredient.model");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const MEAL_TYPES = ["breakfast", "lunch", "dinner"];

const recipeSchema = Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            lowercase: true,
            maxlength: 100,
        },
        tags: {
            type: [{type: String, lowercase: true, maxlength: 10}],
        },
        time: {
            type: Number,
            min: 0,
            max: 300, //300 min = 5h
        },
        mealType: {
            type: [{type: String, lowercase: true, enum: MEAL_TYPES}],
            required: true
        },
        ingredients: {
            type: [ingredientSchema],
            required: true
        },
        description: {
            type: String,
            maxlength: 1000,
        },
        recipe: {
            type: String,
            maxlength: 5000,
        },
        img: {
            data: Buffer,
            contentType: String,
        },
        peopleNumber: {
            type: Number,
            min: 0,
            max: 100,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        favouriteCount: {
            type: Number,
            default: 0,
        },
    },
    {timestamps: true}
);

recipeSchema.pre("save", function (next) {
    this.isFavourite = this.favouriteCount > 0;
    next();
});

const Recipe = mongoose.model("Recipe", recipeSchema);

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

module.exports = {
    Recipe,
    validateRecipe: validateRecipe,
};
