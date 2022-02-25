const MealPlan = require("../models/meal-plan.model");

const getUserMealPlans = async (user_id) => {
  return await MealPlan.find({ author: user_id });
};

const getUserMealPlan = async (id) => {
  return await MealPlan.findById({ _id: id });
};

const udpateUserMealPlan = async (id, requestBody) => {
  return await MealPlan.findByIdAndUpdate({ _id: id }, requestBody, {
    new: true,
  });
};

const deleteUserMealPlan = async (id) => {
  return await MealPlan.deleteOne({ _id: id });
};

const createUserMealPlan = async (item) => {
  return await item.save();
};

module.exports = {
  getUserMealPlans,
  getUserMealPlan,
  udpateUserMealPlan,
  deleteUserMealPlan,
  createUserMealPlan,
};
