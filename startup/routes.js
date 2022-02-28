const cors = require('cors')
const express = require("express")
const recipesRouter = require("../routers/recipes.router");
const mealPlansRouter = require("../routers/mealPlans.router");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use((err, req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
      return res.status(200).json({});
    }
    next();
  });

  //place routes here ...
  app.use("/recipes", recipesRouter);

  app.use("/meal-plans", mealPlansRouter);
};
