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

exports.resetUserPass = async (req, res, next) => {
  const { email } = req.body;
  try {
    await UserService.resetUserPassLink(email);
    res.status(200).json({ message: "E-mail has been sent" });
  } catch (error) {
    next(error);
  }
};

exports.findUserId = async (req, res, next) => {
  const { id, token } = req.params;
  try {
    await UserService.findUser(id, token);
    res.send(JSON.stringify(result));
  } catch (error) {
    next(error);
  }
};

exports.resetPass = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    await UserService.resetUserPassword(id, password);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const updatedData = req.body;
  this.updateUser(updatedData);
  try {
    const result = await UserService.updateUser(updatedData);
    return res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(200).send(true);
  } catch (error) {
    next(error);
  }
};
