// put api for user
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { NotFoundError } = require("../helpers/errorHandlers");

exports.resetService = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
  console.log(secret);
  const payload = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "15m" });
  const link = `http://localhost:3000/forgot-password/${user._id}/${token}`;
  console.log(link);
  return link;
};

exports.findService = async (id, token) => {
  const user = await User.findOne({ id: id });
  if (id !== user.id) throw new NotFoundError("User not found.");

  const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

  return jwt.verify(token, secret, (err, decoded) => {
    if (err) throw new UnauthorizedError("You don't have access.");

    return decoded;
  });
};

exports.resetPassService = async (id, password) => {
  const user = await User.findOne({ id: id });

  if (id !== user.id) throw new NotFoundError("Invalid id.");

  const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

  return jwt.verify(token, secret, async (err, decoded) => {
    if (err) throw new UnauthorizedError("You don't have access.");
    user.password = password;
    return await user.save();
  });
};
