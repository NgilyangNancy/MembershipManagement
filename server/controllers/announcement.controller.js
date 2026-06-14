const Announcement = require("../models/Announcement");

exports.list = async (_req, res) => res.json(await Announcement.find().sort({ createdAt: -1 }));
exports.create = async (req, res) =>
  res.status(201).json(await Announcement.create({ ...req.body, createdBy: req.user._id }));
exports.remove = async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
