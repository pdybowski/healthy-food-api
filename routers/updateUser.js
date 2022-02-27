const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

router.put("/:id", async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updatedData = req.body;
  await User.findOneAndUpdate({ username: req.params.id }, updatedData, (err, user) => {
    if (err) return res.status(500).json(err);

    return res.json(user);
  });
  return res.status(200).json("updatedUser");
});

module.exports = router;
