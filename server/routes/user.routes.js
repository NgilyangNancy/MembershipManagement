const router = require("express").Router();
const c = require("../controllers/user.controller");
const { protect, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", protect, adminOnly, c.list);
router.put("/me", protect, upload.single("avatar"), c.updateProfile);
router.put("/:id/role", protect, adminOnly, c.setRole);
router.delete("/:id", protect, adminOnly, c.remove);

module.exports = router;
