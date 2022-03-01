const cors = require('cors')
const express = require("express")
const passwordReset = require("../routers/passwordReset");
const updateUser = require("../routers/updateUser");
const pageResourceRouter = require("../routers/pageResource.router");
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

  app.use("/forgot-password", passwordReset);
  app.use("/user", updateUser);
  //place routes here ...
  app.use("/pageResource", pageResourceRouter);
};
