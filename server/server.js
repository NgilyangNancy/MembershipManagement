require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
connectDB();

// Universal access configuration to completely eliminate browser CORS blocks
app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (_req, res) => res.json({ ok: true, name: "Membership API" }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/plans", require("./routes/plan.routes"));
app.use("/api/memberships", require("./routes/membership.routes"));
app.use("/api/payments", require("./routes/payment.routes"));
app.use("/api/events", require("./routes/event.routes"));
app.use("/api/announcements", require("./routes/announcement.routes"));
app.use("/api/reports", require("./routes/report.routes"));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
