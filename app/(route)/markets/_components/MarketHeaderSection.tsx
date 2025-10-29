"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChartNetworkIcon } from "lucide-react";

export default function MarketHeaderSection() {
  return (
    <section className="pt-28 pb-10 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2"
      >
        <ChartNetworkIcon className="w-12 h-12" />
        <span>Popular Stocks</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-slate-400 max-w-2xl mx-auto"
      >
        Discover trending stocks with real-time analytics and quick access to detailed pages for each company.
      </motion.p>
    </section>
  );
}
