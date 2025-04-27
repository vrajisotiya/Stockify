const router = require("express").Router();
const stocklist = require("../controllers/stocklist");
const authMiddleware = require("../middleware/authmiddleware");

router.use(authMiddleware);
router.get("/", stocklist.stocklist);

module.exports = router;
