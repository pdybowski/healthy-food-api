const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ingredientSchema } = require('./IngredientSchema');

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];

const recipeSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
      type: String,
      required: true,
      lowercase: true,
      enum: MEAL_TYPES,
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
    isFavourite: {
      type: Boolean,
      default: false,
    },
    favouriteCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

recipeSchema.pre('save', function (next) {
  if (this.favouriteCount > 0) {
    this.isFavourite = true;
  } else {
    this.isFavourite = false;
  }
  next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
