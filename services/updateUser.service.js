const User = require("../models/user.model");

exports.updateUserService = async (body) => {
  await User.updateOne(
    { email: body.email },
    {
      $set: body,
    },
    (err, updatedUser) => {
      if (err) {
        return err;
      }
      return updatedUser;
    }
  );
};
