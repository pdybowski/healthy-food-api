const cors = require("cors");
const express = require("express");
const pageResourceRouter = require("../routers/pageResource.router");
const userMealPlanRouter = require("../routers/user.router");
const userRouter = require("../routers/user.router");
const router = express.Router();

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
  app.use("/user", userMealPlanRouter, userRouter);
  app.use("/pageResource", pageResourceRouter);
};

module.exports = router;
