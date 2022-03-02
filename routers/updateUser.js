const express = require("express");
const router = express.Router();
const updateUserController = require("../controllers/updateUser.controller");

router.put("/update", updateUserController.updateUser);

/**
 * DELETE USER
 */
router.delete("/delete/:id", updateUserController.deleteUser)


module.exports = router;
