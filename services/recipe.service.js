//should be from database
const {recipes, ROLE} = require('../data')

exports.findAllRecipes = async () => {
    return recipes;
}

exports.findUserRecipes = async (user) => {
    return recipes.filter(recipe => recipe.username === user.name);
}

exports.setRecipe = (req, res, next) => {
    const recipeId = parseInt(req.params.recipeId)
    req.recipe = recipes.find(recipe => recipe.recipeId === recipeId)

    if (req.recipe == null) {
        res.status(404)
        return res.send('Recipe not found')
    }
    next()
}