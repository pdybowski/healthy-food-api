require("dotenv").config();

const winston = require("winston");
const express = require("express");
const app = express();
const path = require("path");

// require("./startup/logging")(); // initialize exceptions
require("./startup/routes")(app); // load route
require("./startup/db")(); // connect to the DB
require("./startup/config")(); // config db

if (process.env.NODE_ENV === "production") {
  winston.info("Run producton mode");
  require("./startup/prod")(app); // load production middleware
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// listen to the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});

