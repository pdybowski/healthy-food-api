const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes.controller");

/**
 * GET ALL RECIPES
 */

router.get("/", recipesController.recipes_get_all);

module.exports = router;