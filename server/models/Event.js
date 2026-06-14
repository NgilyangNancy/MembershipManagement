const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: String,
    startsAt: { type: Date, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Event", eventSchema);
