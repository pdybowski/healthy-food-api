const Recipe = require("../models/recipe.model");

const getRecipes = async (user_id) => {
    return await Recipe.find({});
};

module.exports = {
    getRecipes
};