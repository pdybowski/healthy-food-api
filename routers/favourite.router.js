const express = require("express");
const router = express.Router();
const FavouriteController = require("../controllers/favourite.controller");

router.get("/favourite/mealplans", FavouriteController.getAllMealPlans);
router.get("/favourite/recipes", FavouriteController.getAllRecipes);
router.patch("/favourite/mealplans/:id", FavouriteController.updateMealPlan);
router.patch("/favourite/recipes/:id", FavouriteController.updateRecipe);

module.exports = router;
