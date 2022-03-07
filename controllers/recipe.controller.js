const nodemon = require('nodemon')
const {
    getOne,
    getMany,
    createOne,
    updateOne,
    deleteOne
} = require('../services/recipe.service')



const getUserRecipes = async (req, res, next) => {

    try {
        const recipes = await getMany(req.user._id)
        res.send(recipes)
    } catch (e) {
        res.status(400).send(e)
        next()
    }
}

const getSingleRecipe = async(req,res,next) => {
    try {
        const recipe = await getOne(req.params.id)
        res.send(recipe)
    } catch (e) {
        res.status(400).send(e)
        next()
    }
}

const createRecipe = async(req,res,next) => {
    try {
        const recipe = await createOne(req.body)
        res.status(201).send(recipe)
    } catch (e) {
        res.status(400).send(e)
        next()
    }
}

const updateRecipe = async(req,res,next) => {
    try {
        const recipe = await updateOne(req.params.id,req.body)
        res.status(200).send(recipe)
    } catch (e) {
        res.status(400).send(e)
        next()
    }
}

const deleteRecipe = async(req,res,next) => {
    try {
        const recipe = deleteOne(req.params.id)
        res.send(recipe)
    } catch (e) {
        res.status(400).send(e)
        next()
    }
}

module.exports = {
    getUserRecipes,
    getSingleRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
}