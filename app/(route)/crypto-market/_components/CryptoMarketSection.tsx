"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy load agar aman dari SSR error
const TradingViewWidget = dynamic(
  () => import("@/components/TradingViewWidget"),
  { ssr: false }
);

export default function CryptoSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[80vh] rounded-xl overflow-hidden">
      {/* 🪙 Crypto Screener (lebih lebar) */}
      <div className="lg:col-span-2 border border-slate-800 bg-[#0b0b0b]/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <TradingViewWidget
          type="crypto-screener"
          width="100%"
          height="100%"
          config={{
            screener_type: "crypto_mkt",
            displayCurrency: "USD",
            colorTheme: "dark",
            locale: "en",
          }}
        />
      </div>

      {/* 🔥 Crypto Heatmap (lebih kecil) */}
      <div className="border border-slate-800 bg-[#0b0b0b]/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <TradingViewWidget
          type="crypto-heatmap"
          width="100%"
          height="100%"
          config={{
            colorTheme: "dark",
            locale: "en",
          }}
        />
      </div>
    </motion.section>
  );
}
