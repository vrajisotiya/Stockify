const fund = require("../controllers/fund");
const authMiddleware = require("../middleware/authmiddleware");
const { validateFund } = require("../middleware/fundmiddleware");
const router = require("express").Router();

router.use(authMiddleware);
router.get("/", fund.fund);
router.post("/deposit", validateFund, fund.depositfund);
router.post("/withdraw", validateFund, fund.withdrawfund);
module.exports = router;
