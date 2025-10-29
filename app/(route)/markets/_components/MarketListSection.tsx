"use client";

import React from "react";
import { motion } from "framer-motion";
import StockCard from "./StockCard";
import { StockItem } from "../page";
interface MarketSectionProps {
  results: StockItem[];
  loading: boolean;
}

export default function MarketListSection({
  results,
  loading,
}: MarketSectionProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-slate-500">
        Loading market data...
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {results.map((stock, index) => (
        <StockCard key={stock.symbol} stock={stock} index={index} />
      ))}
    </motion.section>
  );
}
