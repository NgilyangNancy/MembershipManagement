const Payment = require("../models/Payment");

exports.mine = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : "60c72b2f9b1d8b2bad123456";
    const history = await Payment.find({ user: userId }).populate("plan");
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to compile financial ledger files" });
  }
};

exports.create = async (req, res) => {
  try {
    const { planId, amount, method, userId } = req.body;
    const targetUser = req.user ? req.user._id : (userId || "60c72b2f9b1d8b2bad123456");
    
    // Support file uploads for requirement 3 (manual bank receipt uploads)
    const receiptPath = req.file ? `/uploads/${req.file.filename}` : "";

    const transaction = await Payment.create({
      user: targetUser,
      plan: planId || null,
      amount: Number(amount || 0),
      method: method || "Bank Transfer",
      receipt: receiptPath,
      status: "pending",
      date: new Date()
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Payment registration grid failure:", error);
    res.status(500).json({ message: "Invoicing runtime system failed to register billing item" });
  }
};

exports.listAll = async (req, res) => {
  try {
    const transactions = await Payment.find({}).populate("user").populate("plan");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to query system global accounting rows" });
  }
};

exports.verify = async (req, res) => {
  try {
    const entry = await Payment.findByIdAndUpdate(req.params.id, { status: "verified" }, { new: true });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: "Auditor clearance state transformation failure" });
  }
};
