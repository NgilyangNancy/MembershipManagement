const router = require("express").Router();
const c = require("../controllers/event.controller");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", c.list);
router.post("/", protect, adminOnly, c.create);
router.put("/:id", protect, adminOnly, c.update);
router.delete("/:id", protect, adminOnly, c.remove);
router.post("/:id/rsvp", protect, c.rsvp);

module.exports = router;
