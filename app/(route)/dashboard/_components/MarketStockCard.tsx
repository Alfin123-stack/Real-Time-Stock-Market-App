"use client";
import React from "react";
import { motion } from "framer-motion";

interface MarketStockCardProps {
  title: string;
  subtitle: string;
  height?: string;
  delay?: number;
  colSpan?: string;
  children: React.ReactNode;
}

export default function MarketStockCard({
  title,
  subtitle,
  height = "500px",
  delay = 0.6,
  colSpan = "",
  children,
}: MarketStockCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: delay }}
      className={`bg-[#111] rounded-2xl border border-[#1f1f1f] shadow-xl overflow-hidden ${colSpan}`}>
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-[#1f1f1f]">
        <h2 className="text-lg font-semibold text-orange-400">{title}</h2>
        <span className="text-sm text-slate-400">{subtitle}</span>
      </div>

      {/* Content (children) */}
      <div className="w-full" style={{ height }}>
        {children}
      </div>
    </motion.div>
  );
}
