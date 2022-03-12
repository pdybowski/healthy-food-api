const mongoose = require("mongoose");
const { Schema } = mongoose;
const { daySchema } = require("./day.model");

const mealPlanSchema = Schema(
  {
    days: {
      type: [daySchema],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      lowercase: true,
      maxlength: 20,
      required: true,
    },
    tags: [{ type: String, lowercase: true, maxlength: 10 }],
    img: {
      data: Buffer,
      contentType: String,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;
