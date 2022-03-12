require("dotenv").config();

module.exports = function () {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("FATAL ERROR: access_token is not defined.");
  }
};
