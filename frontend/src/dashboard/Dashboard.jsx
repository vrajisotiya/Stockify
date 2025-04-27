import React, { useEffect, useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  ChartPie,
  Wallet,
  BarChart,
  Briefcase,
  IndianRupee,
} from "lucide-react";
import axios from "axios";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalFund: 0,
    portfolioValue: 0,
    portfolioInvestment: 0,
    portfolioGain: 0,
    portfolioGainPer: 0,
    loading: true,
    error: false,
  });

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    (async () => {
      try {
        const [fundResponse, holdingsResponse] = await Promise.all([
          axios.get(`${API_URL}/api/fund`, { withCredentials: true }),
          axios.get(`${API_URL}/api/holding`, { withCredentials: true }),
        ]);

        const totalFund = fundResponse.data.data.totalBalance;
        const holdings = holdingsResponse.data.data;

        let value = 0;
        let investment = 0;

        holdings.forEach((item) => {
          value += item.ltp * item.quantity;
          investment += item.avgprice * item.quantity;
        });

        const gain = value - investment;
        const gainPercent = investment > 0 ? (gain / investment) * 100 : 0;

        setDashboardData({
          totalFund,
          portfolioValue: value,
          portfolioInvestment: investment,
          portfolioGain: gain,
          portfolioGainPer: gainPercent.toFixed(2),
          loading: false,
          error: null,
        });
      } catch (error) {
        setDashboardData((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load dashboard data",
        }));
      }
    })();
  }, []);

  const {
    totalFund,
    portfolioValue,
    portfolioInvestment,
    portfolioGain,
    portfolioGainPer,
    loading,
    error,
  } = dashboardData;

  const gainIsPositive = portfolioGain > 0;
  const gainColor = gainIsPositive ? "text-green-500" : "text-red-500";
  const GainArrow = gainIsPositive ? ArrowUp : ArrowDown;

  if (loading) {
    return (
      <div className="w-full lg:w-2/3 lg:p-4 md:p-6 flex justify-center items-center h-64">
        <div className="animate-pulse">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-2/3 lg:p-4 md:p-6 flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full  lg:p-4 md:p-6">
      <div className="flex mb-6 border-b">
        <div className="pb-3 px-4 cursor-pointer text-blue-600">
          <div className="flex items-center">
            <ChartPie className="w-5 h-5 mr-2" />
            Equity
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex flex-col">
            <div className="flex items-center mb-3">
              <Wallet className="w-5 h-5 mr-2 text-blue-500" />
              <div className="text-gray-500 text-sm font-medium">
                Total Available Fund
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800">
              <span className="inline-flex items-center">
                <IndianRupee className="w-6 h-6" />
                {totalFund.toLocaleString("en-IN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center mb-3">
            <BarChart className="w-5 h-5 mr-2 text-blue-500" />
            <div className="text-gray-500 text-sm font-medium">
              Profit & Loss
            </div>
          </div>
          <div
            className={`text-3xl font-semibold mb-2 flex items-center  ${gainColor}`}
          >
            <IndianRupee className="w-6 " />
            {portfolioGain.toLocaleString("en-IN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </div>

          <div className={`${gainColor} text-sm mb-5 flex items-center`}>
            <GainArrow className="w-5 h-5 mr-2" />
            {portfolioGainPer}%
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-1">
                <IndianRupee className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-sm text-gray-500">Portfolio Value</span>
              </div>
              <div className="flex items-center font-semibold text-lg text-gray-800">
                <IndianRupee className="w-5  mr-1 text-gray-700" />
                {portfolioValue.toLocaleString("en-IN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-1">
                <Briefcase className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-sm text-gray-500">Investment</span>
              </div>
              <div className="flex items-center font-semibold text-lg text-gray-800">
                <IndianRupee className="w-5  mr-1 text-gray-700" />
                {portfolioInvestment.toLocaleString("en-IN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
