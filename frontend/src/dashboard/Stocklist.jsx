import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowUp,
  ArrowDown,
  Search,
  Activity,
  X,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChartCandlestick,
  RefreshCw,
} from "lucide-react";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

export default function Stocklist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockData, setStockData] = useState([]);
  const [watchlistExpanded, setWatchlistExpanded] = useState(true);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderType, setOrderType] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState(null);
  const [hoveredStock, setHoveredStock] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchStockList = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/stocklist`);
        setStockData(response.data.data);
      } catch (err) {
        console.error("Error fetching stock list:", err);
        setError("Failed to load stock list.");
      }
    };

    fetchStockList();
  }, []);

  const filteredStocks = useMemo(() => {
    if (!searchTerm.trim()) return stockData;
    const lowerSearch = searchTerm.toLowerCase();
    return stockData.filter((stock) =>
      stock.symbol.toLowerCase().includes(lowerSearch)
    );
  }, [stockData, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStocks = filteredStocks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const openOrderModal = (type, stockItem) => {
    setOrderType(type);
    setSelectedStock(stockItem);
    setPrice(stockItem.price);
    setOrderModalOpen(true);
    setError(null);
    setOrderStatus(null);
  };

  const closeOrderModal = () => {
    setOrderModalOpen(false);
    setSelectedStock(null);
    setQuantity(1);
    setLoading(false);
  };

  const openChartModal = (stockItem) => {
    setSelectedStock(stockItem);
    setShowChart(true);
    setChartLoading(true);
    setChartError(null);
  };

  const closeChartModal = () => {
    setShowChart(false);
    setSelectedStock(null);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrderStatus(null);

    const validprice = Number(price);
    const validqty = Math.floor(Number(quantity));

    if (isNaN(validprice) || validprice <= 0) {
      setError({
        message: "Invalid price",
        details: "Please enter a valid amount greater than 0",
      });
      setLoading(false);
      return;
    }

    if (isNaN(validqty) || validqty < 1) {
      setError({
        message: "Invalid quantity",
        details: "Please enter a quantity of at least 1",
      });
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        orderType === "buy"
          ? `${API_URL}/api/order/buy`
          : `${API_URL}/api/order/sell`;
      const response = await axios.post(endpoint, {
        name: selectedStock.symbol,
        quantity: validqty,
        price: validprice,
      });

      if (response.status === 200) {
        setOrderStatus({
          success: true,
          message: `${
            orderType === "buy" ? "Buy" : "Sell"
          } order placed successfully for ${quantity} ${
            selectedStock.symbol
          } at ₹${price}`,
        });
        setTimeout(closeOrderModal, 3000);
      }
    } catch (error) {
      setError({
        message: error.response?.data?.message || "Order failed",
        details: "Error submitting order",
      });
    } finally {
      setLoading(false);
    }
  };

  const WatchListActions = ({ stockItem }) => (
    <td className="py-2 px-1 absolute right-0">
      <div className="flex items-center space-x-1">
        <Tooltip title="Buy (B)" placement="top" arrow>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded flex items-center justify-center"
            onClick={() => openOrderModal("buy", stockItem)}
          >
            B
          </button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold w-8 h-8 rounded flex items-center justify-center"
            onClick={() => openOrderModal("sell", stockItem)}
          >
            S
          </button>
        </Tooltip>
        <Tooltip title="Chart" placement="top" arrow>
          <button
            className="bg-gray-600 text-white text-sm font-bold w-8 h-8 rounded flex items-center justify-center"
            onClick={() => openChartModal(stockItem)}
          >
            <ChartCandlestick size={16} />
          </button>
        </Tooltip>
      </div>
    </td>
  );

  const renderStockRow = (stockItem) => {
    const isPositive = stockItem.change >= 0;
    const colorClass = isPositive ? "text-green-500" : "text-red-500";

    return (
      <tr
        key={stockItem.symbol}
        className="hover:bg-gray-50 border-b border-gray-100 relative"
        onMouseEnter={() => setHoveredStock(stockItem.symbol)}
        onMouseLeave={() => setHoveredStock(null)}
      >
        <td>
          <div className="flex items-center">
            <span className="font-medium">{stockItem.symbol}</span>
          </div>
        </td>
        <td className="py-3 px-3 text-right">
          <span className="font-medium">
            {stockItem.price.toLocaleString("en-IN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </span>
        </td>
        <td className="py-3 px-3 text-right">
          <div className={`flex items-center justify-end ${colorClass}`}>
            <span className="font-medium mr-1">
              {stockItem.change.toFixed(2)} (
              {stockItem.changePercent.toFixed(2)}%)
            </span>
            {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </div>
        </td>
        {hoveredStock === stockItem.symbol && (
          <WatchListActions stockItem={stockItem} />
        )}
      </tr>
    );
  };

  const renderMobileStockCard = (stockItem) => {
    const isPositive = stockItem.change >= 0;
    const colorClass = isPositive ? "text-green-500" : "text-red-500";

    return (
      <div
        key={stockItem.symbol}
        className="p-3 border-b border-gray-100 hover:bg-gray-50"
        onClick={() =>
          setHoveredStock(
            hoveredStock === stockItem.symbol ? null : stockItem.symbol
          )
        }
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-medium">{stockItem.symbol}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">
              {stockItem.price.toFixed(2)}
            </span>
            {hoveredStock === stockItem.symbol ? (
              <ChevronUp size={16} className="text-gray-500" />
            ) : (
              <ChevronDown size={16} className="text-gray-500" />
            )}
          </div>
        </div>

        {hoveredStock === stockItem.symbol && (
          <>
            <div
              className={`flex items-center justify-between mt-2 ${colorClass}`}
            >
              <span className="text-sm">
                Change: {stockItem.change.toFixed(2)} (
                {stockItem.changePercent.toFixed(2)}%)
              </span>
              {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                className="bg-blue-500 text-white text-sm px-3 py-2 rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  openOrderModal("buy", stockItem);
                }}
              >
                Buy
              </button>
              <button
                className="bg-orange-500 text-white text-sm px-3 py-2 rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  openOrderModal("sell", stockItem);
                }}
              >
                Sell
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 3;

      if (totalPages <= maxVisiblePages + 2) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 2) {
          pages.push(1, 2, 3, "...", totalPages);
        } else if (currentPage >= totalPages - 1) {
          pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
          );
        }
      }

      return pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && paginate(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
          disabled={page === "..."}
        >
          {page}
        </button>
      ));
    };

    return (
      <div className="flex items-center justify-center py-4 border-t">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-1 rounded-md mr-2 ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center space-x-1">{renderPageNumbers()}</div>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-1 rounded-md ml-2 ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setWatchlistExpanded(!watchlistExpanded)}
          className="bg-blue-500 text-white rounded-full p-3 shadow-lg"
        >
          {watchlistExpanded ? <X size={20} /> : <Activity size={20} />}
        </button>
      </div>

      <div
        className={`lg:w-1/3 border-r bg-white flex flex-col fixed lg:static inset-0 z-30 lg:z-auto transform transition-transform duration-300 ease-in-out ${
          watchlistExpanded
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-3 border-b bg-gray-50 sticky top-0 z-10">
          <h2 className="font-medium flex items-center">
            <Activity size={16} className="mr-2" />
            Stock List
          </h2>
          <button
            onClick={() => setWatchlistExpanded(false)}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-3 border-b sticky top-14 z-10 bg-white">
          <div className="relative">
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Search stock..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              size={20}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>
        </div>

        <div className="flex-grow overflow-auto flex flex-col">
          <div className="hidden md:block flex-grow">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="py-2 px-3 text-left">Symbol</th>
                  <th className="py-2 px-3 text-right">LTP</th>
                  <th className="py-2 px-3 text-right">Change</th>
                </tr>
              </thead>
              <tbody>
                {currentStocks.length > 0 ? (
                  currentStocks.map(renderStockRow)
                ) : (
                  <tr className="border-b border-gray-100">
                    <td
                      colSpan="3"
                      className="py-4 px-3 text-center text-gray-500"
                    >
                      No stocks found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden flex-grow">
            {currentStocks.length > 0 ? (
              currentStocks.map(renderMobileStockCard)
            ) : (
              <div className="p-4 text-gray-500 text-center">
                No stocks found matching your search
              </div>
            )}
          </div>

          <Pagination />
        </div>
      </div>

      {orderModalOpen && selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                {orderType === "buy" ? "Buy Order" : "Sell Order"}:{" "}
                {selectedStock.symbol}
              </h3>
              <button
                onClick={closeOrderModal}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={24} />
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-start">
                <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{error.message}</div>
                  {error.details && (
                    <div className="text-sm mt-1">{error.details}</div>
                  )}
                </div>
              </div>
            )}

            {orderStatus?.success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 flex items-start">
                <CheckCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Order Placed Successfully</div>
                  <div className="text-sm mt-1">{orderStatus.message}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitOrder}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="text-lg font-medium mt-2 p-3 bg-gray-50 rounded-lg">
                  Total: ₹{(price * quantity).toFixed(2)}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeOrderModal}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                  disabled={loading}
                >
                  {orderStatus?.success ? "Close" : "Cancel"}
                </button>
                {!orderStatus?.success && (
                  <button
                    type="submit"
                    className={`text-white px-4 py-2 rounded-lg ${
                      orderType === "buy"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-orange-500 hover:bg-orange-600"
                    } ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : orderType === "buy"
                      ? "Buy"
                      : "Sell"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {showChart && selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4 pb-3  border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                  <ChartCandlestick className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {selectedStock.symbol}
                  </h3>
                </div>
              </div>

              <div className="flex ">
                <button
                  onClick={closeChartModal}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                  title="Close Chart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-grow h-[600px] w-full relative rounded-lg overflow-hidden  ">
              {chartLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-3"></div>
                    <span className="text-gray-600 dark:text-gray-300">
                      Loading chart data...
                    </span>
                  </div>
                </div>
              )}

              {chartError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800">
                  <div className="text-center p-6 max-w-md">
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full inline-flex mb-4">
                      <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Unable to Load Chart
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {chartError.message ||
                        "We couldn't load the chart for this symbol. Please try again."}
                    </p>
                    <button
                      onClick={() => {
                        setChartLoading(true);
                        setChartError(null);
                      }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium flex items-center justify-center mx-auto"
                    >
                      <div className="mr-2">
                        <RefreshCw />
                      </div>
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <AdvancedRealTimeChart
                  symbol={selectedStock.symbol}
                  theme="light"
                  container_id="tradingview_chart"
                  autosize
                  interval="D"
                  timezone="Asia/Kolkata"
                  locale="en"
                  toolbar_bg="#f1f3f6"
                  allow_symbol_change={false}
                  enable_publishing={false}
                  hide_side_toolbar={false}
                  withdateranges={true}
                  onLoad={() => setChartLoading(false)}
                  onError={(err) => {
                    setChartLoading(false);
                    setChartError({
                      message: "Failed to load chart for this symbol",
                      details: err.message,
                    });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
