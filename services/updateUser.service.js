const User = require("../models/user.model");

exports.updateUserService = async (body) => {
  try {
    await User.updateOne(
      { email: body.email },
      {
        $set: body,
      }
    );
    return res.status(200).json("updatedUser");
  } catch (err) {
    return err;
  }
};
