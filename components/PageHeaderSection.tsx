"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChartNetworkIcon, Newspaper, Coins } from "lucide-react";

type PageHeaderType = "stock" | "news" | "crypto";

interface PageHeaderSectionProps {
  type: PageHeaderType;
  title: string;
  description: string;
}

export default function PageHeaderSection({
  type,
  title,
  description,
}: PageHeaderSectionProps) {
  // 🎨 Tentukan ikon & warna otomatis
  const iconMap = {
    stock: { Icon: ChartNetworkIcon },
    news: { Icon: Newspaper },
    crypto: { Icon: Coins },
  };

  const { Icon } = iconMap[type] || iconMap.stock;

  return (
    <section className="pt-28 pb-10 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center justify-center gap-3">
        <Icon className={`w-12 h-12 text-orange-400`} />
        <span>{title}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-slate-400 max-w-2xl mx-auto">
        {description}
      </motion.p>
    </section>
  );
}
