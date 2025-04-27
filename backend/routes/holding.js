const holding = require("../controllers/holding");
const router = require("express").Router();
const authMiddleware = require("../middleware/authmiddleware");

router.use(authMiddleware);
router.get("/", holding.holding);
module.exports = router;
