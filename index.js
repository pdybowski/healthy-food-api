require("dotenv").config();

const winston = require("winston");
require("winston-mongodb");
const express = require("express");
const app = express();
const mongoose = require ("mongoose");
const authRoute = require("./routers/auth");
// const jwt = require ("jsonwebtoken");

DeviceMotionEvent.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MONGODB"))
  .catch((err) => console.log(err));




require("./startup/logging")(); // initialize exceptions
require("./startup/routes")(app); // load route
require("./startup/db")(); // connect to the DB
require("./startup/config")(); // config db

if (process.env.NODE_ENV === "production") {
    winston.info("Run producton mode");
    require("./startup/prod")(app); // load production middleware
}

// listen to the port
const port = process.env.PORT || 4453;
app.listen(port, () => {
    winston.info(`Listening on port ${port}...`);
});