const UserService = require("../services/user.service");

exports.getAllUserMealPlans = async (req, res, next) => {
  userId = req.user._id;
  try {
    const mealPlans = await UserService.getUserMealPlans(userId);
    res.status(200).json(mealPlans);
  } catch (error) {
    next(error);
  }
};

exports.getUserMealPlan = async (req, res, next) => {
  try {
    const mealPlan = await UserService.getUserMealPlan(req.params.id);
    res.status(200).json(mealPlan);
  } catch (error) {
    next(error);
  }
};

exports.createUserMealPlan = async (req, res, next) => {
  try {
    const newMealPlan = await UserService.createUserMealPlan(req.body);
    res.status(201).json(newMealPlan);
  } catch (error) {
    next(error);
  }
};

exports.updateUserMealPlan = async (req, res, next) => {
  try {
    await UserService.udpateUserMealPlan(req.params.id, req.body);
    res.status(200).json({ message: "Updated meal plan" });
  } catch (error) {
    next(error);
  }
};

exports.deleteUserMealPlan = async (req, res, next) => {
  try {
    await UserService.deleteUserMealPlan(req.params.id);
    res.status(200).json({ message: "Deleted meal plan" });
  } catch (error) {
    next(error);
  }
};
