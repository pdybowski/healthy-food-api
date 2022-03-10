const FavouriteService = require("../services/favourite.service");

exports.getAllMealPlans = async (req, res, next) => {
  userId = req.user._id;
  try {
    const mealPlans = await FavouriteService.getUserFavouriteMealPlans(userId);
    res.status(200).json(mealPlans);
  } catch (error) {
    next(error);
  }
};

exports.updateMealPlan = async (req, res, next) => {
  userId = req.user._id;
  try {
    await FavouriteService.udpateFavMealPlanStatus(req.params.id, userId);
    res.status(200).json({ message: "Updated mealplan favourite status" });
  } catch (error) {
    next(error);
  }
};

exports.getAllRecipes = async (req, res, next) => {
  userId = req.user._id;
  try {
    const recipes = await FavouriteService.getUserFavouriteRecipes(userId);
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.updateRecipe = async (req, res, next) => {
  userId = req.user._id;
  try {
    await FavouriteService.udpateFavRecipeStatus(req.params.id, userId);
    res.status(200).json({ message: "Updated recipe favourite status" });
  } catch (error) {
    next(error);
  }
};
