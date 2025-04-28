import React, { useState, useEffect } from "react";
import { ChartPie, X } from "lucide-react";
import axios from "axios";

export default function Fund() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [fund, setFund] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchFundData();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL;
  const fetchFundData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/fund`, {
        withCredentials: true,
      });

      const data = response.data.data.totalBalance;

      setFund(data);
      setError(null);
    } catch (err) {
      setError("Failed to load fund data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/fund/deposit`,
        {
          amount: parseFloat(amount),
        },
        {
          withCredentials: true,
        }
      );

      setAmount("");
      setShowAddModal(false);
      fetchFundData();
    } catch (err) {
      alert("Failed to add funds. Please try again.");
    }
  };

  const handleWithdrawFunds = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > fund) {
      alert("Insufficient funds for withdrawal");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/fund/withdraw`,
        {
          amount: parseFloat(amount),
        },
        {
          withCredentials: true,
        }
      );

      setAmount("");
      setShowWithdrawModal(false);
      fetchFundData();
    } catch (err) {
      alert("Failed to withdraw funds. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-end mb-8">
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 text-sm rounded-md transition-colors font-medium shadow-sm"
          >
            Add funds
          </button>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 text-sm rounded-md transition-colors font-medium shadow-sm"
          >
            Withdraw
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="flex items-center bg-gray-50 py-4 px-6 border-b">
          <ChartPie className="w-5 h-5 mr-3 text-blue-600" />
          <h2 className="text-lg font-medium text-gray-800">Account Balance</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <div className="animate-pulse flex justify-center">
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-500">{error}</div>
        ) : (
          <div className="p-10 text-center">
            <div className="text-gray-600 mb-1 text-sm font-medium">
              Total Balance
            </div>
            <div className="text-blue-600 font-bold text-4xl">
              ₹
              {fund.toLocaleString("en-IN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Add Funds"
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setAmount("");
        }}
        onSubmit={handleAddFunds}
        actionText="Add Funds"
        fund={fund}
        amount={amount}
        setAmount={setAmount}
      />

      <Modal
        title="Withdraw Funds"
        isOpen={showWithdrawModal}
        onClose={() => {
          setShowWithdrawModal(false);
          setAmount("");
        }}
        onSubmit={handleWithdrawFunds}
        actionText="Withdraw"
        fund={fund}
        amount={amount}
        setAmount={setAmount}
      />
    </div>
  );
}

const Modal = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  actionText,
  fund,
  amount,
  setAmount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              min="1"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Available Balance:</span>
              <span className="font-medium">
                ₹
                {fund.toLocaleString("en-IN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md mr-2 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};
