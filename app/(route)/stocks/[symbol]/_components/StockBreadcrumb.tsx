"use client";

import React from "react";

interface StockBreadcrumbProps {
  symbol: string;
}

export default function StockBreadcrumb({ symbol }: StockBreadcrumbProps) {
  return (
    <section className="text-sm text-slate-500 mt-28 mb-4">
      <span className="hover:text-orange-400 cursor-pointer">Markets</span> /
      <span className="text-orange-400 ml-1 font-medium uppercase">
        {symbol}
      </span>
    </section>
  );
}
