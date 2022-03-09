const express = require("express");
const router = express.Router();
const FavouriteController = require("../controllers/favourite.controller");

/**
 * GET ALL FAVOURITE USER'S MEALPLANS
 */
router.get(
  "/favourite/mealplans",
  FavouriteController.favourite_user_mealplans_get_all
);

/**
 * GET ALL FAVOURITE USER'S RECIPES
 */
router.get(
  "/favourite/recipes",
  FavouriteController.favourite_user_recipes_get_all
);

/**
 * CHANGE FAVOURITE STATUS OF THE MEALPLAN / LIKE-DISLIKE MEALPLAN
 */
router.patch(
  "/favourite/mealplans/:id",
  FavouriteController.favourite_mealplan_update_one
);

/**
 * CHANGE FAVOURITE STATUS OF THE RECIPE / LIKE-DISLIKE RECIPE
 */
router.patch(
  "/favourite/recipes/:id",
  FavouriteController.favourite_recipe_update_one
);

module.exports = router;
