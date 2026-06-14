const router = require("express").Router();
const c = require("../controllers/announcement.controller");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", c.list);
router.post("/", protect, adminOnly, c.create);
router.delete("/:id", protect, adminOnly, c.remove);

module.exports = router;
