const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();

const user = {
  id: "hahahahaodji4893298",
  email: "i.gorbacz@gmail.com",
  password: "66898789",
};

router.get("/", (req, res, next) => {
  res.render("forgot-password");
});

router.post("/", (req, res, next) => {
  const { email } = req.body;
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
});

router.get("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  //check if this id exist in database
  if (id !== user.id) {
    res.send("Invalid id ...");
    return;
  }
  //we have a valid id, and we have a valid user with this id
  const secret = process.env.JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});
router.post("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  const { password, password2 } = req.body;

  if (id !== user.id) {
    res.send("Invalid id ...");
    return;
  }
  const secret = process.env.JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    //we can simply find the user with the payload email and id an finally update new password
    user.password = password;
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

module.exports = router;
