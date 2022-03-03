const express = require("express");
const router = express.Router();
const { reset, resetId, resetPass } = require("../controllers/reset.controller");
router.post("/", reset);

router.route("/:id/:token").get(resetId).post(resetPass);

module.exports = router;
