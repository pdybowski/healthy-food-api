const cors = require("cors");
const express = require("express");
const { authToken } = require("../middleware/auth");
const error = require("../middleware/error");
const pageResourceRouter = require("../routers/pageResource.router");
const userMealPlanRouter = require("../routers/user.router");
const recipesRouter = require ('../routers/recipe.router')
const authRouter = require("../routers/auth.router");


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
  app.use("/api/user", authToken, userMealPlanRouter, recipesRouter);
  app.use("/api/pageResource", pageResourceRouter);
  app.use("/api/auth", authRouter);

  app.use(error);
};
