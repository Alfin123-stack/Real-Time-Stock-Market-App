"use client";

import { motion } from "framer-motion";

interface StockHeaderProps {
  symbol: string;
}

export default function StockHeader({ symbol }: StockHeaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 text-center xl:text-left">
      <h1 className="text-4xl font-bold text-white tracking-tight">
        {symbol} Stock Overview
      </h1>
      <p className="text-slate-400 text-sm mt-2 max-w-2xl">
        Comprehensive real-time analytics, technical indicators, and company
        fundamentals — all powered by{" "}
        <span className="text-orange-400 font-medium">TradingView</span>.
      </p>
    </motion.section>
  );
}
