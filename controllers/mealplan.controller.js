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
    next(error);
  }
};

exports.user_mealplans_get_one = async (req, res, next) => {
  try {
    const mealPlan = await getUserMealPlan(req.params.id);
    res.status(200).json(mealPlan);
  } catch (err) {
    next(error);
  }
};

exports.user_mealplans_create_one = async (req, res, next) => {
  try {
    const newMealPlan = await createUserMealPlan(req.body);
    res.status(201).json(newMealPlan);
  } catch (err) {
    next(error);
  }
};

exports.user_mealplans_update_one = async (req, res, next) => {
  try {
    await udpateUserMealPlan(req.params.id, req.body);
    res.status(200).json({ message: "Updated meal plan" });
  } catch (err) {
    next(error);
  }
};

exports.user_meal_plan_delete_one = async (req, res, next) => {
  try {
    await deleteUserMealPlan(req.params.id);
    res.status(200).json({ message: "Deleted meal plan" });
  } catch (err) {
    next(error);
  }
};
