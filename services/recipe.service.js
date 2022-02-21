const {findRecipeById} = require("./recipe.service");
const {NotFoundError} = require("../helpers/errorHandlers");

exports.findAllRecipes = async () => {
    //TODO
}
exports.findRecipeById = async (recipeId) => {
    //TODO
}

exports.findUserRecipes = async (user) => {
    //TODO
}

exports.setRecipe = (req, res, next) => {
    const recipeId = parseInt(req.params.recipeId)
    req.recipe = findRecipeById(recipeId)

    if (req.recipe == null) {
        throw new NotFoundError('Recipe not found')
    }
    next()
}