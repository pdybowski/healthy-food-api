const MealPlan = require("../models/meal-plan.model");
const { NotFoundError, UnauthorizedError } = require("../helpers/errorHandlers");
const User = require("../models/user.model");
const Recipe = require('../models/recipe.model')
const jwt = require("jsonwebtoken");
const { authToken } = require("../middleware/auth");
const req = require("express/lib/request");

/*
MEALPLANS
*/

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

/*
RECIPES
*/

exports.getRecipe = async (recipe_id) => {
  const recipe = await Recipe.findById({recipe_id})
  if (!recipe) {
      throw new NotFoundError('No recipe found')
  }

  return recipe
}

exports.getRecipes = async(user_id) => {
  const recipes = await Recipe.find({author: user_id})
  if (!recipes) {
      throw new NotFoundError('No recipes found')
  }
  return recipes
}

exports.createRecipe = async(req) => {

  const reqData = req
  console.log("createRecipe", mongoose.Types.ObjectId(req._id))
  const recipe = new Recipe({
      author: mongoose.Types.ObjectId(req.user._id)
  })
  await recipe.save()
  return recipe
};

exports.updateRecipe = async(recipe_id, update_data) => {

  const recipe = await Recipe.findById({_id: recipe_id})
  if(!recipe)
  {
      throw  new NotFoundError('Recipe not found')
  }
  await Recipe.findByIdAndUpdate({_id: recipe_id}, update_data, {new: true})
  return recipe
};

exports.deleteRecipe = async(recipe_id) => {
  const recipe = await Recipe.findById({ _id: id });
if (!recipe) {
  throw new NotFoundError("Meal plan doesn't exist");
}
await Recipe.deleteOne({ _id: id });
return true;
};


/*
USER
*/
exports.resetUserPassLink = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const payload = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "15m" });
  const link = `http://localhost:3000/forgot-password/${user._id}/${token}`;
  return link;
};

exports.findUser = async (id, token) => {
  const user = await User.findOne({ id: id });
};

exports.resetUserPassword = async (id, password) => {
  const user = await User.findOne({ id: id });

  if (!user) throw new NotFoundError("User not found.");

  const secret = process.env.ACCESS_TOKEN_SECRET;

  return jwt.verify(token, secret, async (err, decoded) => {
    if (err) throw new UnauthorizedError("Access denied");
    user.password = password;
    return await user.save();
  });
};

exports.updateUser = async (body) => {
  await User.updateOne(
    { email: body.email },
    {
      $set: body,
    },
    (err, updatedUser) => {
      if (err) {
        return err;
      }
      return updatedUser;
    }
  );
};




