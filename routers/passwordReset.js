const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user.model");


router.get("/", (req, res, next) => {
  res.render("forgot-password");
});

router.post("/", (req, res, next) => {
  const { email } = req.body;
  //make sure user exist in database
  if (email !== User.email) {
    res.send("User not registered");
    return;
  }

  //User exist and now create One time link valid 15 minutes
  const secret = process.env.JWT_SECRET + User.password;
  const payload = {
    email: User.email,
    id: User.id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "15m" });
  const link = `http://localhost:3000/reset-password/${User.id}/${token}`;
  console.log(link);
  res.send("Password reset link has been sent to your email...");
});

router.get("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  //check if this id exist in database
  if (id !== User.id) {
    res.send("Invalid id ...");
    return;
  }
  //we have a valid id, and we have a valid user with this id
  const secret = process.env.JWT_SECRET + User.password;
  try {
    const payload = jwt.verify(token, secret);
    res.render("reset-password", { email: User.email });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});
router.post("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  const { password, password2 } = req.body;

  if (id !== User.id) {
    res.send("Invalid id ...");
    return;
  }
  const secret = process.env.JWT_SECRET + User.password;
  try {
    const payload = jwt.verify(token, secret);
    //we can simply find the user with the payload email and id an finally update new password
    User.password = password;
    res.send(User);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

module.exports = router;
