const jwt = require("jsonwebtoken");
const User = require("../models/User");

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET || "super_secret_membership_key_123", { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

exports.register = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ message: "Missing fields" });
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });
    
    // FORCED ADMIN MODE: Explicitly adds role: "admin" directly into the user creation query parameters
    const user = await User.create({ fullName, email, phone, password, role: "admin" });
    
    res.status(201).json({
      token: sign(user._id),
      user: { id: user._id, fullName: user.fullName, email: user.email, role: "admin" },
    });
  } catch (error) {
    console.error("Registration endpoint error:", error);
    res.status(500).json({ message: "Server registry processing error" });
  }
};

exports.login = async (req, res) => {
  try {
    // Captures the selected role ("admin" or "member") sent by your login form dropdown menu
    const { email, password, role } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: "Invalid credentials" });
    
    // Safety verification: Forces your user instance role matching rules to recognize you as an admin
    const userRole = user.role || role || "admin";

    res.json({
      token: sign(user._id),
      user: { id: user._id, fullName: user.fullName, email: user.email, role: userRole },
    });
  } catch (error) {
    console.error("Login endpoint error:", error);
    res.status(500).json({ message: "Server session processing error" });
  }
};

exports.me = async (req, res) => {
  // Ensures session tokens verify active background dashboard instances as admin
  if (req.user) {
    req.user.role = req.user.role || "admin";
  }
  res.json(req.user);
};
