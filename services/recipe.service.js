const Recipe = require('../models/recipe.model')
const { NotFoundError } = require('../helpers/errorHandlers')
const statusCodes = require('../helpers/httpStatusCode')



const getRecipe = async (user_id, recipe_id) => {
    const recipe = await Recipe.findOne({author: user_id, _id: recipe_id }).lean()
    if (!recipe) {
        throw new NotFoundError('No recipe found')
    }

    return recipe
};
const getRecipes = async(user_id) => {
    const recipes = await Recipe.find({author: user_id})
    if (!recipes) {
        throw new NotFoundError('No recipes found')
    }
    return recipes
}
const createRecipe = async(req) => {
    const recipe = new Recipe({
        ...req.body
    })
    await recipe.save()
    return recipe
};
const updateRecipe = async(recipe_id, update_data) => {

    const recipe = await Recipe.findById({_id: recipe_id})
    if(!recipe)
    {
        throw  new NotFoundError('Recipe not found')
    }
    await Recipe.findByIdAndUpdate({_id: recipe_id}, update_data, {new: true})
    return recipe
};
const deleteRecipe = async(recipe_id) => {
    const recipe = await Recipe.findById({ _id: id });
  if (!recipe) {
    throw new NotFoundError("Meal plan doesn't exist");
  }
  await Recipe.deleteOne({ _id: id });
  return true;
};


module.exports = {
    getRecipe,
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
}