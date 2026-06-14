const mongoose = require("mongoose");
const membershipSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
    status: { type: String, enum: ["pending", "active", "expired", "rejected"], default: "pending" },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Membership", membershipSchema);
