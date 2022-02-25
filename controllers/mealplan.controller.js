const MealPlan = require("../models/meal-plan.model");

const {
  getUserMealPlans,
  getUserMealPlan,
  udpateUserMealPlan,
  deleteUserMealPlan,
  createUserMealPlan,
} = require("../services/userMealPlan.service");

exports.user_mealplans_get_all = async (req, res, next) => {
  userId = req.user._id;
  try {
    const mealPlans = await getUserMealPlans(userId);
    res.status(200).json(mealPlans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.user_mealplans_get_one = async (req, res, next) => {
  try {
    const mealPlan = await getUserMealPlan(req.params.id);
    res.status(200).json(mealPlan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.user_mealplans_create_one = async (req, res, next) => {
  const mealPlan = new MealPlan({
    days: req.body.days,
    mealType: req.body.mealType,
    recipe: req.body.recipe,
    dayNumber: req.body.dayNumber,
    author: req.body.author,
    title: req.body.title,
    tags: req.body.tags,
    img: req.body.img,
  });
  try {
    const newMealPlan = await createUserMealPlan(mealPlan);
    res.status(201).json(newMealPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.user_mealplans_update_one = async (req, res, next) => {
  try {
    await udpateUserMealPlan(req.params.id, req.body);
    res.status(200).json({ message: "Updated meal plan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.user_meal_plan_delete_one = async (req, res, next) => {
  try {
    await deleteUserMealPlan(req.params.id);
    res.status(200).json({ message: "Deleted meal plan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
