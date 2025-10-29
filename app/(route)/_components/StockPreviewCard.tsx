import React from "react";
import { motion } from "framer-motion";
import {
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

interface DataPoint {
  t: string;
  v: number;
}

interface StockPreviewCardProps {
  data: DataPoint[];
}

function StockPreviewCard({ data }: StockPreviewCardProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full lg:w-1/2">
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-b from-[#0b0b0b] to-[#0b0b0b]/60 shadow-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-slate-400">AAPL · Apple Inc.</div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-3xl font-bold">390.12</span>
              <span className="text-sm text-emerald-400">+1.24 (0.32%)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Market</div>
            <div className="mt-1 text-sm text-slate-200">NASDAQ</div>
          </div>
        </div>

        <div className="mt-6 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#111827" vertical={false} />
              <XAxis dataKey="t" axisLine={false} tick={{ fill: "#94a3b8" }} />
              <YAxis
                domain={["dataMin - 20", "dataMax + 20"]}
                axisLine={false}
                tick={{ fill: "#94a3b8" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b1220",
                  border: "1px solid #222",
                }}
                itemStyle={{ color: "#ffb07a" }}
              />
              <Line
                type="monotone"
                dataKey="v"
                stroke="#ff8800"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {["AAPL", "MSFT", "GOOG"].map((sym, idx) => (
            <div key={sym} className="p-3 rounded-lg bg-white/3">
              <div className="text-xs text-slate-400">{sym}</div>
              <div className="mt-1 font-semibold">
                {300 + idx * 50 + Math.round(Math.random() * 30)}
              </div>
              <div className="text-sm text-emerald-400">
                +{(Math.random() * 2).toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}

export default StockPreviewCard;
