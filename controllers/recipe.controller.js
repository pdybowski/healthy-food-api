const RecipeService = require('../services/recipe.service')


const getUserRecipes = async (req, res, next) => {
    try {
        const recipes = await RecipeService.getRecipes(req.user._id)
        res.send(recipes)
    } catch (e) {
        
        next(e)
    }
}

const getSingleRecipe = async(req,res,next) => {
    try {
        const recipe = await RecipeService.getRecipe(req.params.id)
        res.send(recipe)
    } catch (e) {
        
        next(e)
    }
}

const createRecipe = async(req,res,next) => {
    try {
        const recipe = await RecipeService.createRecipe(req.body)
        res.status(201).send(recipe)
    } catch (e) {
        
        next(e)
    }
}

const updateRecipe = async(req,res,next) => {
    try {
        const recipe = await RecipeService.updateRecipe(req.params.id,req.body)
        res.status(200).send(recipe)
    } catch (e) {
        
        next(e)
    }
}

const deleteRecipe = async(req,res,next) => {
    try {
        const recipe = RecipeService.deleteRecipe(req.params.id)
        res.send(recipe)
    } catch (e) {
        
        next(e)
    }
}

module.exports = {
    getUserRecipes,
    getSingleRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
}