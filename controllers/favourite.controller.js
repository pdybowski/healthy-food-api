const {
  udpateFavMealPlanStatus,
  getUserFavouriteMealPlans,
  udpateFavRecipeStatus,
  getUserFavouriteRecipes,
} = require("../services/favourite.service");

exports.favourite_user_mealplans_get_all = async (req, res, next) => {
  userId = req.user._id;
  try {
    const mealPlans = await getUserFavouriteMealPlans(userId);
    res.status(200).json(mealPlans);
  } catch (error) {
    next(error);
  }
};

exports.favourite_mealplan_update_one = async (req, res, next) => {
  userId = req.user._id;
  try {
    await udpateFavMealPlanStatus(req.params.id, userId);
    res.status(200).json({ message: "Updated mealplan favourite status" });
  } catch (error) {
    next(error);
  }
};

exports.favourite_user_recipes_get_all = async (req, res, next) => {
  userId = req.user._id;
  try {
    const recipes = await getUserFavouriteRecipes(userId);
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.favourite_recipe_update_one = async (req, res, next) => {
  userId = req.user._id;
  try {
    await udpateFavRecipeStatus(req.params.id, userId);
    res.status(200).json({ message: "Updated recipe favourite status" });
  } catch (error) {
    next(error);
  }
};
