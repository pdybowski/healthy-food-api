const Recipe = require('../models/recipe.model')

const getSingleUserRecipe = async (recipe_id);
const getManyUserRecipes = async();
const createSingleRecipe = async()
const updateSingleRecipe = async (recipe_id);
const deleteSingleRecipe = async (recipe_id);


module.exports = {
    getSingleUserRecipe,
    getManyUserRecipes,
    createSingleRecipe,
    updateSingleRecipe,
    deleteSingleRecipe
}