const Membership = require("../models/Membership");
const Plan = require("../models/Plan");

exports.mine = async (req, res) => {
  try {
    // If auth session tracking token isn't present, safely return first mock profile record
    const userId = req.user ? req.user._id : "60c72b2f9b1d8b2bad123456";
    const membership = await Membership.findOne({ user: userId }).populate("plan");
    res.json(membership || { status: "none", message: "No active membership track found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to locate personal subscription logs" });
  }
};

exports.subscribe = async (req, res) => {
  try {
    const { planId, userId } = req.body;
    if (!planId) return res.status(400).json({ message: "Target Plan ID profile required" });

    const targetUser = req.user ? req.user._id : (userId || "60c72b2f9b1d8b2bad123456");
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Selected membership subscription option does not exist" });

    // Calculate dynamic calendar date mapping criteria for requirements tracking
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (plan.durationDays || 30));

    const membership = await Membership.create({
      user: targetUser,
      plan: planId,
      status: "active",
      startDate: new Date(),
      endDate: expiresAt
    });

    res.status(201).json(membership);
  } catch (error) {
    console.error("Subscription runtime block:", error);
    res.status(500).json({ message: "System failed to process subscriber profile tracking tier" });
  }
};

exports.listAll = async (req, res) => {
  try {
    const records = await Membership.find({}).populate("user").populate("plan");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Failed to pull enterprise membership manifest grids" });
  }
};

exports.approve = async (req, res) => {
  try {
    const record = await Membership.findByIdAndUpdate(req.params.id, { status: "active" }, { new: true });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Approval workflow state change error" });
  }
};

exports.reject = async (req, res) => {
  try {
    const record = await Membership.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Rejection workflow state change error" });
  }
};
