const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const authRoute = require("./routers/auth")
const jwt = require("jsonwebtoken");

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MONGODB"))
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("Hello!");
});
console.log('DANIELA');
app.use("/routers", authRoute);
app.use(express.json());

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



