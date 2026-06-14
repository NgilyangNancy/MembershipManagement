const Event = require("../models/Event");

exports.list = async (_req, res) => res.json(await Event.find().sort({ startsAt: 1 }));
exports.create = async (req, res) => res.status(201).json(await Event.create({ ...req.body, createdBy: req.user._id }));
exports.update = async (req, res) => res.json(await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }));
exports.remove = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
exports.rsvp = async (req, res) => {
  const e = await Event.findById(req.params.id);
  if (!e) return res.status(404).json({ message: "Not found" });
  const idx = e.attendees.findIndex((u) => u.toString() === req.user._id.toString());
  if (idx >= 0) e.attendees.splice(idx, 1);
  else e.attendees.push(req.user._id);
  await e.save();
  res.json(e);
};
