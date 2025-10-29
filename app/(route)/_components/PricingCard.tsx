"use client";

import React from "react";
import { motion } from "framer-motion";

// 🧩 Definisi tipe data untuk plan
export interface PricePlan {
  name: string;
  price: string;
  perks: string[];
  highlight?: boolean; // optional
}

interface PricingCardProps {
  prices: PricePlan;
  index: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ prices, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }} // ✨ animasi saat hover
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className={`p-6 rounded-xl border transition-transform ${
        prices.highlight
          ? "border-orange-500 bg-gradient-to-br from-orange-500/5"
          : "border-slate-800"
      }`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold">{prices.name}</h4>
        <div className="text-2xl font-bold">{prices.price}</div>
      </div>

      {/* List Perks */}
      <ul className="mt-4 text-slate-300 space-y-2 text-left">
        {prices.perks.map((perk: string, idx: number) => (
          <li key={idx}>• {perk}</li>
        ))}
      </ul>

      {/* Button */}
      <div className="mt-6">
        <button
          className={`w-full py-3 rounded-md font-medium transition-colors ${
            prices.highlight
              ? "bg-orange-500 text-black hover:bg-orange-400"
              : "border border-slate-700 text-slate-200 hover:bg-slate-800/40"
          }`}>
          Choose
        </button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
