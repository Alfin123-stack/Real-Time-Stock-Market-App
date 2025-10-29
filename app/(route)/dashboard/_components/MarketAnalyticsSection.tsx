import TradingViewWidget from "@/components/TradingViewWidget";
import React from "react";
import MarketStockCard from "./MarketStockCard";

const WIDGETS = [
  {
    title: "Advanced Real-Time Chart",
    subtitle: "NASDAQ • Technology",
    height: "500px",
    delay: 0.6,
    colSpan: "xl:col-span-2",
    child: (
      <TradingViewWidget
        type="advanced-chart"
        width="100%"
        height="100%"
        config={{ symbol: "NASDAQ:AAPL", theme: "dark", range: "YTD" }}
      />
    ),
  },
  {
    title: "Stock Heatmap",
    subtitle: "S&P 500 • Sector Overview",
    height: "500px",
    delay: 0.7,
    child: (
      <TradingViewWidget
        type="stock-heatmap"
        width="100%"
        height="100%"
        config={{ dataSource: "SPX500", colorTheme: "dark" }}
      />
    ),
  },
  {
    title: "Global Market Overview",
    subtitle: "Indices • Forex • Commodities",
    height: "500px",
    delay: 0.8,
    colSpan: "xl:col-span-2",
    child: (
      <TradingViewWidget
        type="market-overview"
        width="100%"
        height="100%"
        config={{
          colorTheme: "dark",
          dateRange: "12M",
        }}
      />
    ),
  },
  {
    title: "Market News Timeline",
    subtitle: "Real-Time Financial Headlines",
    height: "500px",
    delay: 0.9,
    child: (
      <TradingViewWidget
        type="timeline"
        width="100%"
        height="100%"
        config={{ displayMode: "regular", colorTheme: "dark" }}
      />
    ),
  },
  {
    title: "Forex Screener",
    subtitle: "Analyze Currency Pairs",
    height: "600px",
    delay: 1.0,
    colSpan: "xl:col-span-3",
    child: (
      <TradingViewWidget
        type="screener"
        width="100%"
        height="100%"
        config={{ market: "forex", showToolbar: true }}
      />
    ),
  },
];

function MarketAnalyticsSection() {
  return (
    <section className="flex-grow mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {WIDGETS.map((widget, index) => (
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

export default MarketAnalyticsSection;
