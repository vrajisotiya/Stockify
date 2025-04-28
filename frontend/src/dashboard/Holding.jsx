import {
  Search,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import HoldingsChart from "./HoldingsChart";

export default function Holding() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("symbol");
  const [sortOrder, setSortOrder] = useState("asc");
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchHoldings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/api/holding`, {
          withCredentials: true,
        });

        const apiHoldings = response.data.data;

        const formattedHoldings = apiHoldings.map((item, index) => {
          const avgPrice = Number(item.avgprice);
          const ltp = Number(item.ltp);
          const quantity = Number(item.quantity);
          const investmentValue = avgPrice * quantity;
          const currentValue = ltp * quantity;
          const pnl = currentValue - investmentValue;
          const pnlPercent =
            investmentValue > 0 ? (pnl / investmentValue) * 100 : 0;

          return {
            id: item.id || `holding-${index}`,
            symbol: item.name,
            avgPrice,
            ltp,
            quantity,
            currentValue,
            investmentValue,
            pnl,
            pnlPercent,
            net: Number(item.net),
          };
        });

        setHoldings(formattedHoldings);
      } catch (error) {
        setError("Failed to load holdings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  const filteredHoldings = useMemo(() => {
    return holdings
      .filter((holding) => {
        if (searchTerm === "") return true;
        return holding.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => {
        let compareA = a[sortBy];
        let compareB = b[sortBy];

        if (typeof compareA === "string") {
          compareA = compareA.toLowerCase();
          compareB = compareB.toLowerCase();
        }

        if (sortOrder === "asc") {
          return compareA > compareB ? 1 : -1;
        } else {
          return compareA < compareB ? 1 : -1;
        }
      });
  }, [holdings, searchTerm, sortBy, sortOrder]);

  const { totalCurrentValue, totalInvestmentValue, totalPnL, totalPnLPercent } =
    useMemo(() => {
      const totalCurrentValue = holdings.reduce(
        (sum, holding) => sum + holding.currentValue,
        0
      );
      const totalInvestmentValue = holdings.reduce(
        (sum, holding) => sum + holding.investmentValue,
        0
      );
      const totalPnL = totalCurrentValue - totalInvestmentValue;
      const totalPnLPercent =
        totalInvestmentValue > 0 ? (totalPnL / totalInvestmentValue) * 100 : 0;

      return {
        totalCurrentValue,
        totalInvestmentValue,
        totalPnL,
        totalPnLPercent,
      };
    }, [holdings]);

  const handleSortClick = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const renderSortArrow = (column) => {
    if (sortBy !== column) return null;

    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    );
  };

  const formatNetChange = (net) => {
    const netValue = Number(net).toFixed(2);
    return netValue > 0 ? `+${netValue}` : netValue;
  };

  const renderMobileHoldingCard = (holding) => {
    return (
      <div key={holding.id} className="p-4 border-b last:border-b-0">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="font-medium text-base">{holding.symbol}</span>
          </div>
          <div className={holding.pnl >= 0 ? "text-green-500" : "text-red-500"}>
            {holding.pnlPercent.toFixed(2)}%
            {holding.pnl >= 0 ? (
              <ArrowUp className="w-4 h-4 inline ml-1" />
            ) : (
              <ArrowDown className="w-4 h-4 inline ml-1" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Qty:</span>
            <span>{holding.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Avg Price:</span>
            <span>₹{holding.avgPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">LTP:</span>
            <span className="font-medium">₹{holding.ltp.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">P&L:</span>
            <span
              className={holding.pnl >= 0 ? "text-green-500" : "text-red-500"}
            >
              ₹{Math.abs(holding.pnl).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Current:</span>
            <span>₹{holding.currentValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Net Change:</span>
            <span
              className={holding.net >= 0 ? "text-green-500" : "text-red-500"}
            >
              {formatNetChange(holding.net)}%
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full lg:w-2/3 lg:p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-gray-500">Loading holdings...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-2/3 lg:p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-0">
            <h2 className="text-lg font-medium mb-3 sm:mb-0">
              Holdings ({holdings.length})
            </h2>

            <div className="grid grid-cols-2 sm:flex sm:space-x-6 gap-3 w-full sm:w-auto">
              <div className="text-left sm:text-center">
                <div className="text-gray-500 text-xs sm:text-sm">
                  Current Value
                </div>
                <div className="font-medium text-sm sm:text-base">
                  ₹
                  {totalCurrentValue.toLocaleString("en-IN", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
              <div className="text-left sm:text-center col-span-2 sm:col-span-1">
                <div className="text-gray-500 text-xs sm:text-sm">
                  Total P&L
                </div>
                <div
                  className={`font-medium text-sm sm:text-base ${
                    totalPnL >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ₹
                  {Math.abs(totalPnL).toLocaleString("en-IN", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}{" "}
                  ({totalPnLPercent.toFixed(2)}
                  %)
                  {totalPnL >= 0 ? (
                    <ArrowUp className="w-4 h-4 inline ml-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 inline ml-1" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="relative w-full max-w-xs mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full py-2 pl-8 pr-2 border rounded text-sm"
                placeholder="Search holdings"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div
          className="hidden md:block overflow-auto"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th
                  className="py-3 px-4 text-left cursor-pointer"
                  onClick={() => handleSortClick("symbol")}
                >
                  Symbol {renderSortArrow("symbol")}
                </th>
                <th
                  className="py-3 px-4 text-right cursor-pointer"
                  onClick={() => handleSortClick("quantity")}
                >
                  Qty {renderSortArrow("quantity")}
                </th>
                <th
                  className="py-3 px-4 text-right cursor-pointer"
                  onClick={() => handleSortClick("avgPrice")}
                >
                  Avg. Price {renderSortArrow("avgPrice")}
                </th>
                <th
                  className="py-3 px-4 text-right cursor-pointer"
                  onClick={() => handleSortClick("ltp")}
                >
                  LTP {renderSortArrow("ltp")}
                </th>
                <th
                  className="py-3 px-4 text-right cursor-pointer"
                  onClick={() => handleSortClick("currentValue")}
                >
                  Current Value {renderSortArrow("currentValue")}
                </th>
                <th
                  className="py-3 px-4 text-right cursor-pointer"
                  onClick={() => handleSortClick("pnl")}
                >
                  P&L {renderSortArrow("pnl")}
                </th>

                <th
                  className="py-3 px-4 text-right cursor-pointer"
                  onClick={() => handleSortClick("net")}
                >
                  Net Change {renderSortArrow("net")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredHoldings.length > 0 ? (
                filteredHoldings.map((holding) => (
                  <tr
                    key={holding.id}
                    className="hover:bg-gray-50 border-b border-gray-100"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="font-medium">{holding.symbol}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">{holding.quantity}</td>
                    <td className="py-3 px-4 text-right">
                      {holding.avgPrice.toLocaleString("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {holding.ltp.toLocaleString("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      ₹
                      {holding.currentValue.toLocaleString("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td
                      className={`py-3 px-4 text-right ${
                        holding.pnl >= 0 ? "text-green-500" : "text-red-500"
                      } font-medium`}
                    >
                      ₹
                      {Math.abs(holding.pnl).toLocaleString("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td
                      className={`py-3 px-4 text-right ${
                        holding.net >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {formatNetChange(holding.net)}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-6 text-center text-gray-500">
                    No holdings found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="md:hidden overflow-auto"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          {filteredHoldings.length > 0 ? (
            <div className="divide-y">
              {filteredHoldings.map(renderMobileHoldingCard)}
            </div>
          ) : (
            <div className="py-6 text-center text-gray-500">
              No holdings found matching your criteria
            </div>
          )}
        </div>
      </div>
      {filteredHoldings.length > 0 ? (
        <div className="my-8">
          <HoldingsChart holdings={holdings} />
        </div>
      ) : null}
    </div>
  );
}
