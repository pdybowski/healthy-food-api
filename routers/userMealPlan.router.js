const express = require("express");
const router = express.Router();
const MealPlanController = require("../controllers/mealplan.controller");
const validate = require("../middleware/validate");
const validateMealPlan = require("../validation/meal-plan.validation");

/**
 * GET ALL USER'S MEALPLANS
 */
router.get("/mealplans", MealPlanController.user_mealplans_get_all);

/**
 * GET ONE USER'S MEALPLAN
 */
router.get("/mealplans/:id", MealPlanController.user_mealplans_get_one);

/**
 * CREATE USER'S MEALPLAN
 */
router.post(
  "/mealplans",
  validate(validateMealPlan),
  MealPlanController.user_mealplans_create_one
);

/**
 * UPDATE ONE USERS'S MEALPLAN
 */
router.patch(
  "/mealplans/:id",
  validate(validateMealPlan),
  MealPlanController.user_mealplans_update_one
);

/**
 * DELETE ONE USERS'S MEALPLAN
 */
router.delete("/mealplans/:id", MealPlanController.user_meal_plan_delete_one);

module.exports = router;
