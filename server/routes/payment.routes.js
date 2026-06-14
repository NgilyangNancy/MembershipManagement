const router = require("express").Router();
const c = require("../controllers/payment.controller");
const upload = require("../middleware/upload");

// Streamlined for local environment testing with 'protect' and 'adminOnly' blocks removed
router.get("/me", c.mine);
router.post("/", upload.single("receipt"), c.create);
router.get("/", c.listAll);
router.put("/:id/verify", c.verify);

module.exports = router;
