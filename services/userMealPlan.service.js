const MealPlan = require("../models/meal-plan.model");
const { NotFoundError } = require("../helpers/errorHandlers");

const getUserMealPlans = async (user_id) => {
  const mealPlan = await MealPlan.find({ author: user_id });
  if (!mealPlan) {
    throw new NotFoundError("Meal plans don't exist");
  } else {
    return mealPlan;
  }
};

const getUserMealPlan = async (id) => {
  const mealPlan = await MealPlan.findById({ _id: id });
  if (!mealPlan) {
    throw new NotFoundError("Meal plan doesn't exist");
  } else {
    return mealPlan;
  }
};

const udpateUserMealPlan = async (id, requestBody) => {
  const mealPlan = await MealPlan.findById({ _id: id });
  if (!mealPlan) {
    throw new NotFoundError("Meal plan doesn't exist");
  } else {
    return await MealPlan.findByIdAndUpdate({ _id: id }, requestBody, {
      new: true,
    });
  }
};

const deleteUserMealPlan = async (id) => {
  const mealPlan = await MealPlan.findById({ _id: id });
  if (!mealPlan) {
    throw new NotFoundError("Meal plan doesn't exist");
  } else {
    return await MealPlan.deleteOne({ _id: id });
  }
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
  return await mealPlan.save();
};

module.exports = {
  getUserMealPlans,
  getUserMealPlan,
  udpateUserMealPlan,
  deleteUserMealPlan,
  createUserMealPlan,
};
