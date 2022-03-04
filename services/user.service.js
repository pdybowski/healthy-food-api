const MealPlan = require("../models/meal-plan.model");
const { NotFoundError } = require("../helpers/errorHandlers");

exports.getUserMealPlans = async (userId) => {
  const mealPlan = await MealPlan.find({ author: userId });
  if (!mealPlan) {
    throw new NotFoundError("Meal plans don't exist");
  }
  return mealPlan;
};

exports.getUserMealPlan = async (id) => {
  const mealPlan = await MealPlan.findById({ _id: id });
  if (!mealPlan) {
    throw new NotFoundError("Meal plan doesn't exist");
  }
  return mealPlan;
};

exports.udpateUserMealPlan = async (id, reqBody) => {
  const mealPlan = await MealPlan.findById({ _id: id });
  if (!mealPlan) {
    throw new NotFoundError("Meal plan doesn't exist");
  }
  await MealPlan.findByIdAndUpdate({ _id: id }, reqBody, {
    new: true,
  });
  return true;
};

exports.deleteUserMealPlan = async (id) => {
  const mealPlan = await MealPlan.findById({ _id: id });
  if (!mealPlan) {
    throw new NotFoundError("Meal plan doesn't exist");
  }
  await MealPlan.deleteOne({ _id: id });
  return true;
};

exports.createUserMealPlan = async (reqBody) => {
  const mealPlan = new MealPlan({
    days: reqBody.days,
    mealType: reqBody.mealType,
    recipe: reqBody.recipe,
    dayNumber: reqBody.dayNumber,
    author: reqBody.author,
    title: reqBody.title,
    tags: reqBody.tags,
    img: reqBody.img,
  });
  return await mealPlan.save();
};