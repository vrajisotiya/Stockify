require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/authroute");
const order = require("./routes/order");
const holding = require("./routes/holding");
const fund = require("./routes/fund");
const stocklist = require("./routes/stocklist");
const processPendingOrders = require("./jobs/processpendingorders");
const updateStockPrices = require("./jobs/stocklistprice");
const deleteOldOrders = require("./jobs/deleteoldorder");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

//let Mongo_url = "mongodb://127.0.0.1:27017/stockify";
let Mongo_url = process.env.DB_URL;
async function main() {
  await mongoose.connect(Mongo_url);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("Error to connect to DB ", err);
  });

app.get("/api/cron", async (req, res) => {
  const { key } = req.query;
  if (key !== process.env.CRON_SECRET_KEY) {
    return res.status(403).send("Unauthorized");
  }
  try {
    await updateStockPrices();
    await processPendingOrders();
    await deleteOldOrders();
  } catch (error) {
    console.error("Error running scheduled jobs: ", error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/order", order);
app.use("/api/holding", holding);
app.use("/api/fund", fund);
app.use("/api/stocklist", stocklist);

app.get("/", (req, res) => {
  res.send("it is stockify backend");
});

app.use((err, req, res, next) => {
  let { statusCode = 400, message = "Something went Wrong!" } = err;
  res.status(statusCode).send({ message });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
