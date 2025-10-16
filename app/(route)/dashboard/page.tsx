"use client";

import React from "react";
import TradingViewWidget from "@/components/TradingViewWidget";
import { motion } from "framer-motion";
import { ArrowLeftRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header Section */}
      <header className="border-b border-[#1a1a1a] py-6 px-6 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="text-orange-500" />
          Real-Time Stock Dashboard
        </motion.h1>

        <Button
          size="sm"
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2">
          <ArrowLeftRight className="h-4 w-4 mr-1" />
          Switch Market
        </Button>
      </header>

      {/* Widgets Section */}
      <section className="flex-grow p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* --- 1️⃣ ADVANCED CHART (Besar, col-span-2) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#111] rounded-2xl border border-[#1f1f1f] shadow-xl overflow-hidden xl:col-span-2">
          <div className="p-4 flex justify-between items-center border-b border-[#1f1f1f]">
            <h2 className="text-lg font-semibold text-orange-400">
              AAPL • Apple Inc.
            </h2>
            <span className="text-sm text-slate-400">NASDAQ • Technology</span>
          </div>
          <div className="h-[500px]">
            <TradingViewWidget
              type="advanced-chart"
              width="100%"
              height="100%"
              config={{
                symbol: "NASDAQ:AAPL",
                theme: "dark",
                range: "YTD",
              }}
            />
          </div>
        </motion.div>

        {/* --- 2️⃣ STOCK HEATMAP --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-[#111] rounded-2xl border border-[#1f1f1f] shadow-xl overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b border-[#1f1f1f]">
            <h2 className="text-lg font-semibold text-orange-400">
              Stock Heatmap
            </h2>
            <span className="text-sm text-slate-400">
              S&P 500 • Sector Overview
            </span>
          </div>
          <div className="h-[500px]">
            <TradingViewWidget
              type="stock-heatmap"
              width="100%"
              height="100%"
              config={{
                dataSource: "SPX500",
                colorTheme: "dark",
              }}
            />
          </div>
        </motion.div>

        {/* --- 3️⃣ MARKET OVERVIEW (col-span-2 untuk tampilan besar) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#111] rounded-2xl border border-[#1f1f1f] shadow-xl overflow-hidden xl:col-span-2">
          <div className="p-4 flex justify-between items-center border-b border-[#1f1f1f]">
            <h2 className="text-lg font-semibold text-orange-400">
              Global Market Overview
            </h2>
            <span className="text-sm text-slate-400">
              Indices • Forex • Commodities
            </span>
          </div>
          <div className="h-[500px]">
            <TradingViewWidget
              type="market-overview"
              width="100%"
              height="100%"
              config={{
                colorTheme: "dark",
                dateRange: "12M",
              }}
            />
          </div>
        </motion.div>

        {/* --- 4️⃣ TIMELINE (NEWS FEED) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="bg-[#111] rounded-2xl border border-[#1f1f1f] shadow-xl overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b border-[#1f1f1f]">
            <h2 className="text-lg font-semibold text-orange-400">
              Market News Timeline
            </h2>
            <span className="text-sm text-slate-400">
              Real-Time Financial Headlines
            </span>
          </div>
          <div className="h-[500px]">
            <TradingViewWidget
              type="timeline"
              width="100%"
              height="100%"
              config={{
                displayMode: "regular",
                colorTheme: "dark",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-500 border-t border-[#1a1a1a] text-sm">
        © {new Date().getFullYear()} Real-Time Stock Market App — Powered by{" "}
        <span className="text-orange-500">TradingView</span>
      </footer>
    </main>
  );
}
