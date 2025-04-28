import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Clipboard,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import axios from "axios";

export default function Order() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const [orderTypeFilter, setOrderTypeFilter] = useState("All");

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/order`, {
          withCredentials: true,
        });
        const apiOrders = response.data.data;

        const formattedOrders = apiOrders.map((order, index) => ({
          id: order.id || `order-${index}`,
          symbol: order.name,
          type: order.mode.toUpperCase(),
          price: Number(order.price),
          quantity: Number(order.quantity),
          status: order.status.toUpperCase(),
          orderTime: new Date(order.createdAt).toLocaleTimeString("en-IN", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          orderDate: new Date(order.createdAt),
          value: Number(order.price) * Number(order.quantity),
          createdAt: new Date(order.createdAt),
        }));

        formattedOrders.sort((a, b) => b.createdAt - a.createdAt);

        setOrders(formattedOrders);
        setError(false);
      } catch (err) {
        setError(err.response.data.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return orders
      .filter((order) => {
        if (!showTodayOnly) return true;
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      })
      .filter((order) => {
        if (activeTab === "All") return true;
        return order.status === activeTab.toUpperCase();
      })
      .filter((order) => {
        if (orderTypeFilter === "All") return true;
        return order.type === orderTypeFilter.toUpperCase();
      })
      .filter((order) => {
        if (searchTerm === "") return true;
        return order.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [orders, activeTab, searchTerm, showTodayOnly, orderTypeFilter]);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderStatusBadge = useCallback((status) => {
    let colorClass = "";

    switch (status) {
      case "COMPLETE":
        colorClass = "bg-green-100 text-green-800";
        break;
      case "PENDING":
        colorClass = "bg-yellow-100 text-yellow-800";
        break;
      case "REJECTED":
        colorClass = "bg-red-100 text-red-800";
        break;
      default:
        colorClass = "bg-gray-100 text-gray-800";
    }

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
        {status}
      </span>
    );
  }, []);

  const renderOrderRow = useCallback(
    (order) => {
      const isPositive = order.type === "BUY";
      const colorClass = isPositive
        ? "text-green-500 font-semibold"
        : "text-red-500 font-semibold";
      return (
        <tr
          key={order.id}
          className="hover:bg-gray-50 border-b border-gray-100"
        >
          <td className="py-3 px-4">
            <div className="flex items-center">
              <span className="font-medium">{order.symbol}</span>
            </div>
          </td>
          <td className="py-3 px-4">
            <span className={colorClass}>{order.type}</span>
          </td>
          <td className="py-3 px-4 text-right">
            <span className="font-medium">
              {order.price.toLocaleString("en-IN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </span>
          </td>
          <td className="py-3 px-4 text-right">{order.quantity}</td>
          <td className="py-3 px-4 text-right font-medium">
            {order.value.toLocaleString("en-IN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </td>
          <td className="py-3 px-4 text-right">
            <div>{order.orderTime}</div>
            <div className="text-xs text-gray-500">
              {order.orderDate.toLocaleDateString("en-IN")}
            </div>
          </td>
          <td className="py-3 px-4 text-center">
            {renderStatusBadge(order.status)}
          </td>
        </tr>
      );
    },
    [renderStatusBadge]
  );

  return (
    <div className="w-full lg:p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <Clipboard className="mr-1 h-5" />
            <h2 className="text-lg font-medium">Orders</h2>
          </div>
        </div>

        <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex space-x-4">
              {["All", "Complete", "Pending"].map((tab) => (
                <div
                  key={tab}
                  className={`px-3 py-2 cursor-pointer ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTodayOnly}
                  onChange={() => {
                    setShowTodayOnly(!showTodayOnly);
                    setCurrentPage(1);
                  }}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm text-gray-600">Today Only</span>
              </label>

              <select
                value={orderTypeFilter}
                onChange={(e) => {
                  setOrderTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded px-3 py-2 text-sm"
              >
                <option value="All">All Types</option>
                <option value="Buy">Buy Orders</option>
                <option value="Sell">Sell Orders</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              className="w-full sm:w-64 py-2 pl-8 pr-2 border rounded text-sm"
              placeholder="Search by Symbol"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div
          className="overflow-auto"
          style={{ maxHeight: "calc(100vh - 250px)" }}
        >
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="py-3 px-4 text-left">Symbol</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">Qty</th>
                <th className="py-3 px-4 text-right">Value</th>
                <th className="py-3 px-4 text-right">Time/Date</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-400">
                    Loading orders...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : currentOrders.length > 0 ? (
                currentOrders.map(renderOrderRow)
              ) : (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    No orders found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredOrders.length > ordersPerPage && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstOrder + 1} to{" "}
              {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-md border ${
                  currentPage === 1
                    ? "bg-gray-100 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`p-2 px-3 rounded-md border ${
                      currentPage === number
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md border ${
                  currentPage === totalPages
                    ? "bg-gray-100 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
