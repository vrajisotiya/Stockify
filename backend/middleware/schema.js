const Joi = require("joi");

module.exports.orderSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().min(1),
  quantity: Joi.number().required().min(1).integer(),
});

module.exports.fundSchema = Joi.object({
  amount: Joi.number().required().min(1),
});
