const MealPlan = require("../models/meal-plan.model");

const getMealPlans = async () => {
    const allMealPlans = await MealPlan.find({});
    return allMealPlans;
};

module.exports = {
    getMealPlans
};