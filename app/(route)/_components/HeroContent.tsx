import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type StatItem = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

interface HeroContentProps {
  stats: StatItem[]; // ✅ array, bukan single object
}

function HeroContent({ stats }: HeroContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full lg:w-1/2">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
        Real-Time Market Data,{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300">
          Delivered Fast
        </span>
      </h1>

      <p className="mt-6 text-slate-300 max-w-xl">
        Platform analitik saham real-time: charts, alerts, and portfolio
        insights — build smarter strategies with instant data streams.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-black px-5 py-3 rounded-lg font-semibold shadow">
          Get Started <ArrowRight className="h-4 w-4" />
        </Link>

        <button className="inline-flex items-center gap-3 border border-slate-800 text-slate-200 px-5 py-3 rounded-lg hover:bg-white/5">
          Live Demo
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white/2 rounded-lg p-3">
            <div className="p-2 rounded-md bg-orange-600/20">{s.icon}</div>
            <div>
              <div className="text-sm text-slate-300">{s.title}</div>
              <div className="font-semibold text-lg">{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default HeroContent;
