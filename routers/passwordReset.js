const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user.model");
const reset = require("../controllers/reset.controller");

router.get("/", (req, res, next) => {
  res.render("forgot-password");
});

router.post("/", reset.reset);

  
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
