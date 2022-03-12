const cors = require("cors");
const express = require("express");

const userRouter = require("../routers/user.router");
const pageResourceRouter = require("../routers/pageResource.router");
const recipesRouter = require("../routers/recipe.router");
const favouritesRouter = require("../routers/favourite.router");
const authRouter = require("../routers/auth.router");

const { authToken } = require("../middleware/auth");
const error = require("../middleware/error");


module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use((err, req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
      return res.status(200).json({});
    }
    next();
  });

  //place routes here ...
  app.use("/api/user", authToken, userRouter, recipesRouter, favouritesRouter);
  app.use("/api/pageResource", pageResourceRouter);
  app.use("/api/auth", authRouter);

  app.use(error);
};
