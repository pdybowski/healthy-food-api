const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MONGODB"))
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

let user = {
  id: "hahahahaodji4893298",
  email: "i.gorbacz@gmail.com",
  password: "66898789",
};

app.get("/forgot-password", (req, res, next) => {
  res.render("forgot-password");
});
app.post("/forgot-password", (req, res, next) => {
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

app.get("/reset-password/:id/:token", (req, res, next) => {
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
app.post("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  const { password, password2 } = req.body;

  if (id !== user.id) {
    res.send("Invalid id ...");
    return;
  }
  const secret = process.env.JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    //validate passwor and password2 should match
    //we can simply find the user with the payload email and id an finally update new password

    user.password = password;
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
