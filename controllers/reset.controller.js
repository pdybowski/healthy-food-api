const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.reset = async (req, res, next) => {
  const { email } = req.body;
  const user = User.findOne();
  //make sure user exist in database
  if (email !== user.email) {
    res.send("User not registered");
    return;
  }

  //User exist and now create One time link valid 15 minutes
  const secret = process.env.JWT_SECRET + user.password;
  const payload = {
    email: user.email,
    id: user.id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "15m" });
  const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
  console.log(link);
  res.send("Password reset link has been sent to your email...");
  next();
};
