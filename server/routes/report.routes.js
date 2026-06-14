const router = require("express").Router();
const c = require("../controllers/report.controller");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/summary", protect, adminOnly, c.summary);

module.exports = router;
