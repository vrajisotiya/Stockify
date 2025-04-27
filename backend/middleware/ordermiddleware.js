const ExpressError = require("../utils/ExpressError");
const { orderSchema } = require("../middleware/schema");

module.exports.validateOrder = (req, res, next) => {
  let { error } = orderSchema.validate(req.body);

  if (error) {
    let errMsg = error.details
      .map((detail) => detail.message.replace(/"/g, ""))
      .join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
