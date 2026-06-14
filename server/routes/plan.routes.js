const router = require("express").Router();
const c = require("../controllers/plan.controller");

// Removed the 'protect' and 'adminOnly' blocks to allow local plan generation
router.get("/", c.list);
router.post("/", c.create);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

module.exports = router;
