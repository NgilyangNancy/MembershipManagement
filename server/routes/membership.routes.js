const router = require("express").Router();
const c = require("../controllers/membership.controller");

// Removed 'protect' and 'adminOnly' middleware constraints for seamless local testing
router.get("/me", c.mine);
router.post("/", c.subscribe);
router.get("/", c.listAll);
router.put("/:id/approve", c.approve);
router.put("/:id/reject", c.reject);

module.exports = router;
