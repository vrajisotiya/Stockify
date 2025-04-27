import React from "react";
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  PieChart,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Powerful <span className="text-blue-600">Features</span> for Smart
              Investors
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stockify gives you all the tools you need to make informed
              investment decisions, track your portfolio performance, and grow
              your wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Real-time Analytics
              </h3>
              <p className="text-gray-600">
                Get instant access to real-time market data, stock performance
                metrics, and advanced analytics all in one place.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Performance Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your portfolio's performance with easy-to-understand
                charts and historical data comparisons.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Risk Analysis
              </h3>
              <p className="text-gray-600">
                Evaluate your investment risk with comprehensive analysis tools
                designed to help you make safer decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive set of features gives you the edge in today's
              market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Advanced Portfolio Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Get a comprehensive view of your investments with our intuitive
                dashboard. Track performance, monitor key metrics, and visualize
                your asset allocation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <PieChart className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Asset allocation visualization
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <TrendingUp className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Performance comparison with market indices
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Zap className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Quick actions for buying and selling
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={dashboard}
                alt="Portfolio Dashboard"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Compare Plans
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that's right for your investment needs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-4 px-6 text-left text-gray-700 font-semibold border-b">
                    Features
                  </th>
                  <th className="py-4 px-6 text-center text-gray-700 font-semibold border-b">
                    Free
                  </th>
                  <th className="py-4 px-6 text-center text-gray-700 font-semibold border-b">
                    Premium
                  </th>
                  <th className="py-4 px-6 text-center text-gray-700 font-semibold border-b">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-6 border-b text-gray-700">
                    Portfolio Tracking
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 border-b text-gray-700">
                    Basic Analytics
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 border-b text-gray-700">
                    Market News
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    Limited
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 border-b text-gray-700">
                    Real-time Data
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✗
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 border-b text-gray-700">
                    Advanced Charts
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✗
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 border-b text-gray-700">
                    AI Recommendations
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✗
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    Limited
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 border-b text-gray-700">
                    Tax Optimization
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✗
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✗
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 border-b text-gray-700">
                    API Access
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✗
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✗
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 border-b text-gray-700">
                    Priority Support
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✗
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-gray-700">Monthly Price</td>
                  <td className="py-3 px-6 text-center text-gray-700">Free</td>
                  <td className="py-3 px-6 text-center text-gray-700">$9.99</td>
                  <td className="py-3 px-6 text-center text-gray-700">
                    $19.99
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Ready to Experience These Amazing Features?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of investors who are growing their wealth with
            Stockify's powerful tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link to="/signup">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 hover:shadow-xl">
                Start Free Trial
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
