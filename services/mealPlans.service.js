const MealPlan = require("../models/meal-plan.model");

const getMealPlans = async (user_id) => {
    return await MealPlan.find({});
};

module.exports = {
    getMealPlans
};