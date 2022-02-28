const {
    getRecipes
} = require("../services/recipes.service");

exports.recipes_get_all = async (req, res, next) => {
    try {
        const recipes = await getRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
};