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

//register
exports.register = async (body) =>{
  const {username, email, password, phoneNumber} = body;

  const user = await User.findOne({email:email});

  if (user){
    throw new BadRequestError ("User already registered");
  }
  const newUser = new User({
    username,
    email,
    password,
    phoneNumber:phoneNumber,
  });
  await newUser.save();
  return generateAccessToken;
};

//login
exports.login = async(body) =>{
  const{email} = body;
  const userWithEmail = await User.findOne({ email: email });

  if (!userWithEmail){
    throw new BadRequestError ("User doesn't exist!")
  }
  return generateAccessToken
};

//logout
exports.logout = async(body) =>{
  const{email,password} = body;
  const user = await User.findOne({ email: email });
  if(!user){
    throw new BadRequestError
    ("User doesn't exist")
  };
}