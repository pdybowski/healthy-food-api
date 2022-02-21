const {findRecipeById} = require("./recipe.service");

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
        return res.status(404).send('Recipe not found')
    }
    next()
}