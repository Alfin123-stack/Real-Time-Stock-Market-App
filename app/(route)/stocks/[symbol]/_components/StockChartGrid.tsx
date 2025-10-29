"use client";

import React from "react";
import StockWidgets from "@/components/StockWidgets";
import MarketStockCard from "@/app/(route)/dashboard/_components/MarketStockCard";

export default function StockChartGrid({ symbol }: { symbol: string }) {
  const STOCK_WIDGETS = [
    {
      title: "Real-Time Stock Symbol",
      subtitle: "Symbol Information & Quote",
      height: "500px",
      delay: 0.6,
      colSpan: "xl:col-span-2",
      child: (
        <StockWidgets
          type="symbolInfo"
          width="100%"
          height="100%"
          symbol={symbol}
        />
      ),
    },
    {
      title: "Technical Analysis",
      subtitle: "Indicators & Chart Studies",
      height: "500px",
      delay: 0.7,
      child: (
        <StockWidgets
          type="technicalAnalysis"
          width="100%"
          height="100%"
          symbol={symbol}
        />
      ),
    },
    {
      title: "Fundamentals / Financials",
      subtitle: "Balance Sheet • Income • Ratios",
      height: "500px",
      delay: 0.8,
      colSpan: "xl:col-span-2",
      child: (
        <StockWidgets
          type="financials"
          width="100%"
          height="100%"
          symbol={symbol}
        />
      ),
    },
    {
      title: "Company Profile",
      subtitle: "Overview & Description",
      height: "500px",
      delay: 0.9,
      child: (
        <StockWidgets
          type="symbolProfile"
          width="100%"
          height="100%"
          symbol={symbol}
        />
      ),
    },
  ];

  return (
    <section className="flex-grow mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {STOCK_WIDGETS.map((widget, index) => (
        <MarketStockCard
          key={index}
          title={widget.title}
          subtitle={widget.subtitle}
          height={widget.height}
          delay={widget.delay}
          colSpan={widget.colSpan}>
          {widget.child}
        </MarketStockCard>
      ))}
    </section>
  );
}
