require("dotenv").config();
const winston = require("winston");
const express = require("express");
const app = express();
const router = require("express").Router();
const AuthRoute = require ("./routers/auth");
const User = require("./models/user.model");
// const UserRouters = require("./routers/user")

app.get("/", (req,res) =>{
    res.json({
        message:"12345",
    })
})
// app.use ('auth', require ("./routers/auth"))
// app.use ("/user", UserRouters);
// app.use("/api", AuthRoute)
// require("./startup/logging")(); // initialize exceptions
require("./startup/routes")(app); // load route
require("./startup/db")(); // connect to the DB
require("./startup/config")(); // config db

if (process.env.NODE_ENV === "production") {
    winston.info("Run producton mode");
    require("./startup/prod")(app); // load production middleware
}
// listen to the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    winston.info(`Listening on port ${port}...`);
});