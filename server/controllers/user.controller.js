const User = require("../models/User");

exports.list = async (_req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

exports.updateProfile = async (req, res) => {
  const { fullName, phone, bio } = req.body;
  const update = { fullName, phone, bio };
  if (req.file) update.avatar = `/uploads/${req.file.filename}`;
  const user = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select("-password");
  res.json(user);
};

exports.setRole = async (req, res) => {
  const { role } = req.body;
  if (!["admin", "member"].includes(role)) return res.status(400).json({ message: "Bad role" });
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
  res.json(user);
};

exports.remove = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
