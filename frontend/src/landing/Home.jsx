import React from "react";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import { ChevronRight, BarChart3, TrendingUp, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Smart Investing Made <span className="text-blue-600">Simple</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Stockify gives you the tools to track, analyze, and optimize your
              investment portfolio with real-time market data and intelligent
              insights.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to={"/signup"}>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center">
                  Get Started
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
              <button className="px-6 py-3 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 flex items-center justify-center">
                Learn More
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src={dashboard}
              alt="Stockify Dashboard"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Stockify
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform gives you everything you need to make informed
              investment decisions.
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
                Track your portfolio performance with real-time market data and
                comprehensive analytics.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Smart Portfolio Management
              </h3>
              <p className="text-gray-600">
                Optimize your portfolio with AI-powered recommendations and risk
                analysis.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Your data is protected with bank-level security and encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                  R
                </div>
                <div>
                  <h4 className="font-semibold">Rahul Sharma</h4>
                  <p className="text-sm text-gray-500">Individual Investor</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Stockify has transformed how I manage my investments. The
                real-time analytics and portfolio insights are game-changers."
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                  P
                </div>
                <div>
                  <h4 className="font-semibold">Priya Patel</h4>
                  <p className="text-sm text-gray-500">Day Trader</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The dashboard gives me all the information I need at a glance.
                The mobile app is perfect for trading on the go."
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                  V
                </div>
                <div>
                  <h4 className="font-semibold">Vikram Singh</h4>
                  <p className="text-sm text-gray-500">Financial Advisor</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I recommend Stockify to all my clients. The platform's ease of
                use and comprehensive data make portfolio management
                effortless."
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 ">
            Ready to Start Investing Smarter?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto ">
            Join thousands of investors who are growing their wealth with
            Stockify's powerful tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link to="/signup">
              <button
                className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-xl hover:shadow-xl
                   "
              >
                Create Free Account
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
