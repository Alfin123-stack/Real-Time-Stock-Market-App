"use client";
import { motion } from "framer-motion";

/* ---------- small reusable ---------- */
export default function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-xl p-6 border border-slate-800 bg-white/3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-orange-600/20">{icon}</div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-slate-300 mt-1">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
