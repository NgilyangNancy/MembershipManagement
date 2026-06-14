const User = require("../models/User");
const Membership = require("../models/Membership");
const Payment = require("../models/Payment");
const Event = require("../models/Event");

exports.summary = async (_req, res) => {
  const [users, active, revenueAgg, events] = await Promise.all([
    User.countDocuments(),
    Membership.countDocuments({ status: "active" }),
    Payment.aggregate([{ $match: { status: "verified" } }, { $group: { _id: null, sum: { $sum: "$amount" } } }]),
    Event.countDocuments(),
  ]);
  res.json({
    totalUsers: users,
    activeMembers: active,
    revenue: revenueAgg[0]?.sum || 0,
    totalEvents: events,
  });
};
