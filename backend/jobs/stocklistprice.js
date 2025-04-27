require("dotenv").config();
const mongoose = require("mongoose");
const Stocklist = require("../models/stocklist");
const Holding = require("../models/holding");
const axios = require("axios");

const apiKeys = [
  process.env.IndianAPI_API_KEY_1,
  process.env.IndianAPI_API_KEY_2,
  process.env.IndianAPI_API_KEY_3,
  process.env.IndianAPI_API_KEY_4,
  process.env.IndianAPI_API_KEY_5,
  process.env.IndianAPI_API_KEY_6,
  process.env.IndianAPI_API_KEY_7,
];

let currentApiKeyIndex = 0;

const getCurrentApiKey = () => {
  return apiKeys[currentApiKeyIndex];
};

const switchApiKey = () => {
  currentApiKeyIndex++;
  if (currentApiKeyIndex >= apiKeys.length) {
    throw new Error("All API keys exhausted. Cannot proceed.");
  }
  console.log(`Switched to API key ${currentApiKeyIndex + 1}`);
};

const getPriceData = async (symbol) => {
  const url = `https://stock.indianapi.in/stock`;
  try {
    const response = await axios.get(url, {
      params: { name: symbol },
      headers: {
        "X-Api-Key": getCurrentApiKey(),
      },
    });

    const data = response.data.stockDetailsReusableData;
    const targetCompanyName = response.data.companyName;
    //console.log(targetCompanyName);

    if (!data) throw new Error("Invalid API response: Missing data");

    // if (data.peerCompanyList) {
    //   console.log(
    //     "Peer Companies:",
    //     data.peerCompanyList.map((p) => p.companyName)
    //   );
    // }
    const lastPrice = parseFloat(data.price);
    const changePercent = parseFloat(data.percentChange);
    const closePrice = parseFloat(data.close);

    let netChange;

    const normalizeName = (name) => {
      return name
        .replace(/\b(Ltd|Limited|LTD|Ld|\.|,)\b/gi, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase()
        .trim();
    };
    if (data.peerCompanyList) {
      matchedPeer = data.peerCompanyList.find(
        (company) =>
          normalizeName(company.companyName) ===
          normalizeName(targetCompanyName)
      );
    }

    if (matchedPeer && matchedPeer.netChange !== undefined) {
      netChange = parseFloat(matchedPeer.netChange);
    } else {
      netChange = parseFloat((lastPrice - closePrice).toFixed(2));
    }

    return {
      lastPrice,
      changePercent,
      netChange,
    };
  } catch (err) {
    if (err.response) {
      if (
        err.response.status === 429 ||
        (err.response.data &&
          err.response.data.message &&
          err.response.data.message
            .toLowerCase()
            .includes("API key requests limit exceeded"))
      ) {
        console.error("API limit hit. Switching API key...");
        switchApiKey();
        return await getPriceData(symbol);
      }
    }
    console.error(`Error fetching data for symbol ${symbol}:`, err.message);
    return null;
  }
};

module.exports = async () => {
  try {
    const stocks = await Stocklist.find();
    const BATCH_DELAY_MS = 1000;

    for (const stock of stocks) {
      const data = await getPriceData(stock.symbol);
      if (!data) {
        await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
        continue;
      }

      stock.price = data.lastPrice;
      stock.changePercent = data.changePercent;
      stock.change = data.netChange;

      await stock.save();

      const holdings = await Holding.find({ name: stock.symbol });
      for (const holding of holdings) {
        const netChangePercent =
          ((data.lastPrice - holding.avgprice) / holding.avgprice) * 100;

        holding.ltp = data.lastPrice;
        holding.net = parseFloat(netChangePercent.toFixed(2));
        await holding.save();
      }

      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  } catch (error) {
    console.error("Error updating stocks:", error.message);
  }
};
