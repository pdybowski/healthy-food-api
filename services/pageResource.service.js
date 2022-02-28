const Recipe = require("../models/recipe.model");
const MealPlan = require("../models/meal-plan.model");


const getPageResource = async () => {
    const [allRecipes, allMealPlans] = await Promise.all([
        Recipe.find({}),
        MealPlan.find({})
    ]);
    const pageResource = {mealPlans: allRecipes, recipes: allMealPlans}
    return pageResource;
};

module.exports = getPageResource;