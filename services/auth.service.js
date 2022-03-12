const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {
  BadRequestError,
  UnauthorizedError,
  InernalServerError,
} = require("../helpers/errorHandlers");
const { hashInput, hashCompare } = require("../hash");
generateAccessToken = async (user) => {
  return jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" },
    null
  );
};
//create token
const token = jwt.generateAccessToken;

//register
exports.register = async (body) =>{
  const {username, email, password, phoneNumber} = body;

  const user = await User.findOne({email:email});

  if (user){
    throw new BadRequestError ("User already registered");
  }
  const resUser = _.pick(newUser, [
    "_id",
    "isAdmin",
    "name"
    ]);
  await resUser.save();
  return { token, resUser }
};

//login
exports.login = async(body) =>{
  const{email} = body;
  const userWithEmail = await User.findOne({ email: email });

  if (!userWithEmail){
    throw new BadRequestError ("User doesn't exist!")
  }
  return { token, isAdmin, name, _id }
};

//logout
exports.logout = async(body) =>{
  const{email,password} = body;
  const user = await User.findOne({ email: email });
  if(user){
    res.status(200).send(true)
  }
  if(!user){
    throw new BadRequestError ("User doesn't exist")
  };
}