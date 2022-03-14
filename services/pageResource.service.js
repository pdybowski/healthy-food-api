const Recipe = require("../models/recipe.model");
const MealPlan = require("../models/meal-plan.model");


exports.getPageResource = async () => {
    const [allRecipes, allMealPlans] = await Promise.all([
        Recipe.find({}),
        MealPlan.find({})
    ]);
    const pageResource = {mealPlans: allMealPlans, recipes: allRecipes}
    return pageResource;
};
