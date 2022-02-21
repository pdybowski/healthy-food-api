//should be from database
const {recipes} = require('../data')

exports.findAllRecipes = async () => {
    return recipes;
}

exports.findUserRecipes = async (user) => {
    return recipes.filter(recipe => recipe.username === user.name);
}
