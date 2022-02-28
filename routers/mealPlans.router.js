const express = require("express");
const router = express.Router();
const mealPlansController = require("../controllers/mealPlans.controller");

/**
 * GET ALL MEAL PLANS
 */

router.get("/", mealPlansController.mealPlans_get_all);

module.exports = router;