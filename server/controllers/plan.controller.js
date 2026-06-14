const Plan = require("../models/Plan");

exports.list = async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.json(plans);
  } catch (error) {
    console.error("List plans error:", error);
    res.status(500).json({ message: "Failed to fetch membership plans" });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, price, durationDays, description, features } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required fields" });
    }

    // Standardize features layout into a clean array structure for MongoDB
    const featuresArray = Array.isArray(features) 
      ? features 
      : typeof features === 'string' 
        ? features.split(",").map(s => s.trim()).filter(Boolean)
        : [];

    const plan = await Plan.create({
      name,
      price: Number(price),
      durationDays: Number(durationDays || 30),
      description: description || "",
      features: featuresArray
    });

    res.status(201).json(plan);
  } catch (error) {
    console.error("Create plan error:", error);
    res.status(500).json({ message: "Failed to create membership plan record" });
  }
};

exports.update = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "Failed to update plan properties" });
  }
};

exports.remove = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan successfully purged from cluster matrix" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete target subscription plan" });
  }
};
