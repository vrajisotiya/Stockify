const Order = require("../models/order");
module.exports = async () => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);

  const result = await Order.deleteMany({ createdAt: { $lt: cutoff } });

  console.log(`Deleted ${result.deletedCount} old orders.`);
};
