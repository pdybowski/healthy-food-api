const _ = require("lodash");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { BadRequestError, UnauthorizedError } = require("../helpers/errorHandlers");
const { hashInput, hashCompare } = require("../hash");

generateAccessToken = (user) => {
  return jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" },
    null
  );
};

//register
exports.register = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ email: email });

  if(user) {
    throw new BadRequestError("User already registered");
  }

  const newUser = new User({ ...body }) 
  newUser.password = await hashInput(password);

  await newUser.save();

  const resUser = _.pick(newUser, [
    "_id",
    "isAdmin",
    "name"
  ]);

  const token = generateAccessToken(resUser);

  return { token, user: resUser }
};

//login
exports.login = async(body) =>{
  const { email, password } = body;

  const user = await User.findOne({ email: email });
  if(!user) throw new BadRequestError("Invalid email or password.");

  const validPassword = await hashCompare(password, user.password);
  if (!validPassword) throw new UnauthorizedError("Invalid email or password.");

  const resUser = _.pick(user, [
    "_id",
    "isAdmin",
    "name"
  ]);

  const token = generateAccessToken(resUser);

  return { token, user: resUser }
};

//logout
exports.logout = async (params) =>{
  const { id } = params;
  const user = await User.findById(id);

  if(!user) throw new BadRequestError("User doesn't exist");
}