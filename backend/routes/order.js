const order = require("../controllers/order");
const router = require("express").Router();
const authMiddleware = require("../middleware/authmiddleware");
const { validateOrder } = require("../middleware/ordermiddleware");

router.use(authMiddleware);
router.get("/", order.orders);
router.post("/buy", validateOrder, order.buy);
router.post("/sell", validateOrder, order.sell);
module.exports = router;
