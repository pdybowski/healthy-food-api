const router = require("express").Router();

router.put("/update", async (req, res) => {
  const updatedData = req.body;
  await User.updateOne(
    { email: req.body.email },
    {
      $set: req.body,
    }
  );
  return res.status(200).json("updatedUser");
});

module.exports = router;
