const mongoose = require("mongoose");
const { Schema } = mongoose;
const { daySchema, dayValidationSchema } = require("./day.model");
const Joi = require("joi");
const {ingredientValidationSchema} = require("./ingredient.model");
Joi.objectId = require('joi-objectid')(Joi)

const mealPlanSchema = Schema(
  {
    days: {
        type: [daySchema],
        required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      lowercase: true,
      maxlength: 20,
      required: true,
    },
    tags: [{ type: String, lowercase: true, maxlength: 10 }],
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

const validateMealPlan = (mealPlan) => {
    const schema = Joi.object({
        days: Joi.array().min(1).items(dayValidationSchema).required(),
        author: Joi.objectId().required(),
        title: Joi.string().trim().max(20).required(),
        tags: Joi.array().items(Joi.string().max(10)),
        img: Joi.binary().encoding('base64'),
    })
    return schema.validate(mealPlan)
}

module.exports = {
    MealPlan,
    validateMealPlan,
};
