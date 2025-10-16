"use client";
import React, { useEffect, useRef, memo } from "react";

/**
 * Reusable TradingView widget
 * Supports: "advanced-chart", "stock-heatmap", "market-overview", "timeline"
 *
 * @param {Object} props
 * @param {"advanced-chart"|"stock-heatmap"|"market-overview"|"timeline"} props.type - Widget type
 * @param {Object} [props.config] - Optional custom TradingView config
 * @param {string|number} [props.width="100%"] - Widget width
 * @param {string|number} [props.height="550"] - Widget height
 */
function TradingViewWidget({
  type = "advanced-chart",
  config = {},
  width = "100%",
  height = 550,
}) {
  const container = useRef();

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = ""; // clear previous widget

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    let src = "";
    let defaultConfig = {};

    switch (type) {
      // --- 1️⃣ ADVANCED CHART ---
      case "advanced-chart":
        src =
          "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        defaultConfig = {
          symbol: "NASDAQ:AAPL",
          interval: "D",
          theme: "dark",
          style: "3",
          locale: "en",
          autosize: true,
          details: true,
          withdateranges: true,
          backgroundColor: "#0F0F0F",
          range: "YTD",
        };
        break;

      // --- 2️⃣ STOCK HEATMAP ---
      case "stock-heatmap":
        src =
          "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
        defaultConfig = {
          dataSource: "SPX500",
          blockSize: "market_cap_basic",
          blockColor: "change",
          grouping: "sector",
          locale: "en",
          colorTheme: "dark",
          isTransparent: false,
        };
        break;

      // --- 3️⃣ MARKET OVERVIEW ---
      case "market-overview":
        src =
          "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
        defaultConfig = {
          colorTheme: "dark",
          dateRange: "12M",
          locale: "en",
          isTransparent: false,
          showChart: true,
          tabs: [
            {
              title: "Indices",
              symbols: [
                { s: "FOREXCOM:SPXUSD", d: "S&P 500 Index" },
                { s: "FOREXCOM:NSXUSD", d: "US 100 Cash CFD" },
                { s: "FOREXCOM:DJI", d: "Dow Jones" },
                { s: "INDEX:NKY", d: "Japan 225" },
                { s: "INDEX:DEU40", d: "DAX Index" },
                { s: "FOREXCOM:UKXGBP", d: "FTSE 100 Index" },
              ],
            },
          ],
        };
        break;

      // --- 4️⃣ TIMELINE ---
      case "timeline":
        src =
          "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
        defaultConfig = {
          displayMode: "compact",
          feedMode: "all_symbols",
          colorTheme: "dark",
          isTransparent: false,
          locale: "en",
        };
        break;

      default:
        console.error("Invalid TradingView widget type");
        return;
    }

    // Merge default config + custom config + dynamic width/height
    const finalConfig = {
      ...defaultConfig,
      ...config,
      width,
      height,
    };

    script.src = src;
    script.innerHTML = JSON.stringify(finalConfig);
    container.current.appendChild(script);
  }, [type, config, width, height]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ width, height }}>
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank">
          <span className="blue-text">TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
