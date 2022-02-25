const express = require("express");
const router = express.Router();
const EmailController = require("../controllers/email.controller");

router.get("/", EmailController.getEmails);

module.exports = router;
