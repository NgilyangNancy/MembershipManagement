const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    membership: { type: mongoose.Schema.Types.ObjectId, ref: "Membership" },
    amount: { type: Number, required: true },
    method: { type: String, default: "manual" },
    receipt: String, // file path uploaded via multer
    status: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Payment", paymentSchema);
