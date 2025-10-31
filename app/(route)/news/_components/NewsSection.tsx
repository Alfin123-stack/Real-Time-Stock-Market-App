"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy load widget agar aman dari SSR error
const TradingViewWidget = dynamic(
  () => import("@/components/TradingViewWidget"),
  { ssr: false }
);

function NewsSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="rounded-xl overflow-hidden border border-slate-800 shadow-lg bg-[#0b0b0b]/70 backdrop-blur-sm h-[80vh]">
      <TradingViewWidget
        type="timeline"
        width="100%"
        height="100%"
        config={{
          displayMode: "regular",
          colorTheme: "dark",
        }}
      />
    </motion.section>
  );
}

export default NewsSection;
