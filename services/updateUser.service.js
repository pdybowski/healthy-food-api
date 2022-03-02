const User = require("../models/user.model");
const { NotFoundError } = require("../helpers/errorHandlers");

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

exports.deleteUser = async (id) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new NotFoundError("User doesn't exist");
  }
  await User.deleteOne({ _id: id });
  return true;
};
