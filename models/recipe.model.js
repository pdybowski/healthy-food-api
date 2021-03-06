const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ingredientSchema } = require("./ingredient.model");
const { MEAL_TYPES } = require("../constants");

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
      type: [{ type: String, lowercase: true, maxlength: 10 }],
    },
    time: {
      type: Number,
      min: 0,
      max: 300, //300 min = 5h
    },
    mealType: {
      type: [{ type: String, lowercase: true, enum: MEAL_TYPES }],
      required: true,
    },
    ingredients: {
      type: [ingredientSchema],
      required: true,
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
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
