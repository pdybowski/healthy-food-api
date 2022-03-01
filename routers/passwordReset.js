const express = require("express");
const router = express.Router();
const { reset, resetId, resetPass } = require("../controllers/reset.controller");

// router.get("/", (req, res, next) => {
//   res.render("forgot-password");
// });

router.post("/", reset);

router.get("/:id/:token", resetId);

router.post("/:id/:token", resetPass);

module.exports = router;
