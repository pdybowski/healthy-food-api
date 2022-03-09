const MealPlan = require("../models/meal-plan.model");
const Recipe = require("../models/recipe.model");
const { NotFoundError } = require("../helpers/errorHandlers");

const udpateFavMealPlanStatus = async (id, userId) => {
  const mealPlan = await MealPlan.findById({ _id: id });
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
        $inc: { favouriteCount: -1 },
        $pull: { likes: userId },
        $set: { isFavourite: false },
      }
    );
  }
  return await MealPlan.updateOne(
    { _id: id },
    {
      $inc: { favouriteCount: 1 },
      $push: { likes: userId },
      $set: { isFavourite: true },
    }
  );
};

const udpateFavRecipeStatus = async (id, userId) => {
  const recipe = await Recipe.findById({ _id: id });
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
        $inc: { favouriteCount: -1 },
        $pull: { likes: userId },
        $set: { isFavourite: false },
      }
    );
  }
  return await Recipe.updateOne(
    { _id: id },
    {
      $inc: { favouriteCount: 1 },
      $push: { likes: userId },
      $set: { isFavourite: true },
    }
  );
};

const getUserFavouriteMealPlans = async (userId) => {
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

const getUserFavouriteRecipes = async (userId) => {
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

module.exports = {
  udpateFavMealPlanStatus,
  getUserFavouriteMealPlans,
  getUserFavouriteRecipes,
  udpateFavRecipeStatus,
};
