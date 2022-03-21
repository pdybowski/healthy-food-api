const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { authToken } = require("../middleware/auth");
const validate = require("../middleware/validate");
const {validateMealPlan, validateUpdateMealPlan} = require("../validation/meal-plan.validation");
const validateUser = require("../validation/user.validation");
const {validateRecipe, validatePatchRecipe} = require('../validation/recipe.validation')


//#region recipes

/**
 * GET USER'S RECIPES
 */
 router.get("/recipes", UserController.getUserRecipes);

 /**
  * GET USER'S SINGLE RECIPES
  */
 router.get("/recipes/:id", UserController.getUserSingleRecipe);
 
 /**
  * CREATE USER'S RECIPE
  */
 router.post("/recipes", validate(validateRecipe), UserController.createRecipe);
//  router.post("/recipes", UserController.createRecipe);
 
 /**
  * UPDATE USER'S RECIPE
  */
 router.patch("/recipes/:id", validate(validatePatchRecipe), UserController.updateRecipe);
 
 /**
  * DELETE USER'S RECIPE
  */
 router.delete("/recipes/:id", UserController.deleteRecipe);
 
 //#endregion




//#region mealplans

/**
 * GET ALL USER'S MEALPLANS
 */
router.get("/mealplans", UserController.getAllUserMealPlans);

/**
 * GET ONE USER'S MEALPLAN
 */
router.get("/mealplans/:id", UserController.getUserMealPlan);

/**
 * CREATE USER'S MEALPLAN
 */
router.post("/mealplans", validate(validateMealPlan), UserController.createUserMealPlan);

/**
 * UPDATE ONE USERS'S MEALPLAN
 */
router.patch("/mealplans/:id", validate(validateUpdateMealPlan), UserController.updateUserMealPlan);

/**
 * DELETE ONE USERS'S MEALPLAN
 */
router.delete("/mealplans/:id", UserController.deleteUserMealPlan);

//#endregion

//#region user


//SENDING A LINK TO RESET PASSWORD
router.post("/", UserController.resetUserPass);

//FIND USER IN DATABASE
router.get("/:id/:token", authToken, UserController.findUserId);

//RESET USER PASSWORD
router.post("/:id/:token", validate(validateUser), UserController.resetPass);

//UPDATE USER
router.put("/update", validate(validateUser), UserController.updateUser);

//#endregion



module.exports = router;


