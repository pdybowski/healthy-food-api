const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const AuthService = require("../services/auth.service")

const responseWithToken = (res, data) => {
  return res.header("X-Auth-Token", data.token).json(data);
};


exports.register = async (req, res,next) => {
  const { username, email, password } = req.body;
  console.log(email);
  console.log(User);
  console.log(password);

  const alreadyExistUser = await User.findOne({ email: email })
  .catch((err) => {
    console.log("Error", err);
  });
  console.log(alreadyExistUser);
  console.log(req.body);

  if (alreadyExistUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  const newUser = new User({
    username,
    email,
    password,
    phoneNumber: req.body.phoneNumber,
  });
  const savedUser = await 
  newUser.save()
  .catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser)
    res.set("x-auth-token", "registerToken")
      .json({ message: "Thanks for registering" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  const userWithEmail = await User.findOne({ email: email }).catch((err) => {
    console.log("Error: ", err);
  });

  if (!userWithEmail)
    return 
    res.status(400)
      .json({ message: "Email or password does not match!" });

  if (userWithEmail.password !== password)
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });
  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );

  res.json({ message: "Welcome Back!", token: jwtToken });
};

exports.logout = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).catch((err) => {
    console.log("Error: ", err);
  });
  if (user) {
    return res.status(200).json({
      status: true,
      message: "Logout succesfully",
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "User doesnt exist",
    });
  }
};




// TODO register
// TODO logout

module.exports = router
