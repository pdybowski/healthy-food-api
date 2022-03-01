const { updateUser } = require("../controllers/updateUser.controller");

const router = require("express").Router();

router.put("/update", updateUser);

module.exports = router;
