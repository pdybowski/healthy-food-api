const Recipe = require("../models/recipe.model");

const getRecipes = async () => {
    const allRecipes = await Recipe.find({});
    return allRecipes;
};

module.exports = {
    getRecipes
};