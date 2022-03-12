// const {
//     getRecipe,
//     getRecipes,
//     createRecipe,
//     updateRecipe,
//     deleteRecipe
// } = require('../services/recipe.service')



// const getUserRecipes = async (req, res, next) => {

//     try {
//         const recipes = await getRecipes(req.user._id)
//         res.send(recipes)
//     } catch (e) {
        
//         next(e)
//     }
// }

// const getSingleRecipe = async(req,res,next) => {
//     try {
//         const recipe = await getRecipe(req.params.id)
//         res.send(recipe)
//     } catch (e) {
        
//         next(e)
//     }
// }

// const updateRecipe = async(req,res,next) => {
//     try {
//         const recipe = await updateRecipe(req.params.id,req.body)
//         res.status(200).send(recipe)
//     } catch (e) {
        
//         next(e)
//     }
// }

// const deleteRecipe = async(req,res,next) => {
//     try {
//         const recipe = deleteRecipe(req.params.id)
//         res.send(recipe)
//     } catch (e) {
        
//         next(e)
//     }
// }

// module.exports = {
//     getUserRecipes,
//     getSingleRecipe,
//     updateRecipe,
//     deleteRecipe
// }