const router = require('express').Router();
const RecipeController = require('../controllers/recipe.controller');
const validate = require('../middleware/validate')
const validateRecipe = require('../validation/recipe.validation')

router.get('/recipes', RecipeController.getUserRecipes)
router.get('/recipes/:id', RecipeController.getSingleRecipe)
router.put('/recipes/:id', validate(validateRecipe), RecipeController.updateRecipe)
router.post('/recipes/:id', validate(validateRecipe), RecipeController.deleteRecipe)


module.exports = router