const mongoose = require("mongoose");

const emailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: "email is required",
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Email", emailsSchema);
