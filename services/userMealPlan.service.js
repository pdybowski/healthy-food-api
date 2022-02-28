const MealPlan = require("../models/meal-plan.model");
const { NotFoundError } = require("../helpers/errorHandlers");

const getUserMealPlans = async (user_id) => {
  const mealPlan = await MealPlan.find({ author: user_id });
  if (!mealPlan) {
    throw new NotFoundError("Meal plans don't exist");
  }
  return mealPlan;
};

const getUserMealPlan = async (id) => {
  const mealPlan = await MealPlan.findById({ _id: id });
  if (!mealPlan) {
    throw new NotFoundError("Meal plan doesn't exist");
  }
  return mealPlan;
};

const udpateUserMealPlan = async (id, requestBody) => {
  const mealPlan = await MealPlan.findById({ _id: id });
  if (!mealPlan) {
    throw new NotFoundError("Meal plan doesn't exist");
  }
  await MealPlan.findByIdAndUpdate({ _id: id }, requestBody, {
    new: true,
  });
  return true;
};

const deleteUserMealPlan = async (id) => {
  const mealPlan = await MealPlan.findById({ _id: id });
  if (!mealPlan) {
    throw new NotFoundError("Meal plan doesn't exist");
  }
  await MealPlan.deleteOne({ _id: id });
  return true;
};

const createUserMealPlan = async (request) => {
  const mealPlan = new MealPlan({
    days: request.days,
    mealType: request.mealType,
    recipe: request.recipe,
    dayNumber: request.dayNumber,
    author: request.author,
    title: request.title,
    tags: request.tags,
    img: request.img,
  });
  await mealPlan.save();
  return true;
};

module.exports = {
  getUserMealPlans,
  getUserMealPlan,
  udpateUserMealPlan,
  deleteUserMealPlan,
  createUserMealPlan,
};
