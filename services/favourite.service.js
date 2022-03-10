const MealPlan = require("../models/meal-plan.model");
const Recipe = require("../models/recipe.model");
const { NotFoundError } = require("../helpers/errorHandlers");

exports.udpateFavMealPlanStatus = async (id, userId) => {
  const mealPlan = await MealPlan.findById(id);
  if (!mealPlan) {
    throw new NotFoundError("MealPlan not found");
  }
  const favMealPlan = await MealPlan.findOne({
    _id: id,
    likes: {
      $elemMatch: { $eq: userId },
    },
  });
  if (favMealPlan) {
    return await MealPlan.updateOne(
      { _id: id },
      {
        $pull: { likes: userId },
      }
    );
  }
  return await MealPlan.updateOne(
    { _id: id },
    {
      $push: { likes: userId },
    }
  );
};

exports.udpateFavRecipeStatus = async (id, userId) => {
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw new NotFoundError("Recipe not found");
  }
  const favRecipe = await Recipe.findOne({
    _id: id,
    likes: {
      $elemMatch: { $eq: userId },
    },
  });
  if (favRecipe) {
    return await Recipe.updateOne(
      { _id: id },
      {
        $pull: { likes: userId },
      }
    );
  }
  return await Recipe.updateOne(
    { _id: id },
    {
      $push: { likes: userId },
    }
  );
};

exports.getUserFavouriteMealPlans = async (userId) => {
  const mealPlans = await MealPlan.find({
    likes: {
      $elemMatch: { $eq: userId },
    },
  });
  if (!mealPlans) {
    throw new NotFoundError("Meal plans not found");
  }
  return mealPlans;
};

exports.getUserFavouriteRecipes = async (userId) => {
  const recipes = await Recipe.find({
    likes: {
      $elemMatch: { $eq: userId },
    },
  });
  if (!recipes) {
    throw new NotFoundError("Recipe not found");
  }
  return recipes;
};
