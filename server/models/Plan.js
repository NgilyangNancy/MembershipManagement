const mongoose = require("mongoose");
const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    durationDays: { type: Number, required: true, default: 30 },
    features: [String],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Plan", planSchema);
