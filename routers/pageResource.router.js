const express = require("express");
const router = express.Router();
const pageResourceController = require("../controllers/pageResource.controller");

/**
 * GET ALL RECIPES AND MEAL PLANS
 */
router.get("/", pageResourceController.get_pageResource)


module.exports = router;
