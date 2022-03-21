const MealPlan = require("../models/meal-plan.model");
const { NotFoundError, UnauthorizedError, BadRequestError } = require("../helpers/errorHandlers");
const User = require("../models/user.model");
const Recipe = require('../models/recipe.model')
const jwt = require("jsonwebtoken");
const { authToken } = require("../middleware/auth");

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

exports.updateUserMealPlan = async (id, reqBody) => {
  const mealPlan = await MealPlan.findByIdAndUpdate({ _id: id }, reqBody, {
    new: true,
  });
  if (!mealPlan) {
    throw new NotFoundError("Meal plan doesn't exist");
  }
  return mealPlan;
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
  console.log('createUserMealPlan ', reqBody)
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

exports.getUserRecipe = async(id) => {
  console.log('service ', id)
  const recipe = await Recipe.find({ _id: id });
  if (!recipe) {
    throw new NotFoundError("Recipe not found");
  }
  return recipe;
}

exports.getRecipes = async(user_id) => {
  const recipes = await Recipe.find({author: user_id})
  if (!recipes) {
      throw new NotFoundError('No recipes found')
  }
  return recipes
}

exports.createRecipe = async(req) => {
  const author = req.user._id
  const recipe = new Recipe({
      title: req.body.title,
      tags: req.body.tags,
      time: req.body.time,
      mealType: req.body.mealType,
      ingredients: req.body.ingredients,
      description: req.body.description,
      recipe: req.body.recipe,
      img: req.body.img,
      peopleNumber: req.body.peopleNumber,
      likes: req.body.likes,
      author: author
  })
  await recipe.save()
  return recipe
};

exports.updateRecipe = async(recipe_id, update_data) => {

  const recipe = await Recipe.findOneAndUpdate(
    {_id: recipe_id},
     update_data,
    {new: true}
    )

  if(!recipe)
  {
      // throw new NotFoundError('Recipe not found')
  }
  return recipe
};

exports.deleteRecipe = async(recipe_id) => {
  const recipe = await Recipe.findByIdAndDelete( recipe_id );
if (!recipe) {
  throw new NotFoundError("Recipe not found. Perhaps it was already deleted");
}
return recipe;
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

exports.deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError('User doesn\'t exist');
  }
  await User.deleteOne({ _id: id });
  return true;
};


