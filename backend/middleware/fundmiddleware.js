const ExpressError = require("../utils/ExpressError");
const { fundSchema } = require("../middleware/schema");

module.exports.validateFund = (req, res, next) => {
  let { error } = fundSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
