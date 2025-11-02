"use client";

import React, { useEffect, useRef, useState, memo } from "react";

/**
 * 🔁 Reusable TradingView Widget Component
 * Supports: advanced-chart, stock-heatmap, market-overview, timeline, ticker-tape, screener
 */
function TradingViewWidget({
  type = "advanced-chart",
  config = {},
  width = "100%",
  height = "550",
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!container.current) return;

    // 🧹 Bersihkan widget lama secara aman
    container.current.innerHTML = "";
    setLoading(true);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    let src = "";
    let defaultConfig = {};

    try {
      switch (type) {
        /** 🧩 ADVANCED CHART **/
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

        /** 🔥 STOCK HEATMAP **/
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

        /** 🌍 MARKET OVERVIEW **/
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

        /** 📰 TIMELINE (News Feed) **/
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

        /** 💹 TICKER TAPE **/
        case "ticker-tape":
          src =
            "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
          defaultConfig = {
            symbols: [
              { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
              { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
              { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
              { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
              { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
            ],
            colorTheme: "dark",
            locale: "en",
            showSymbolLogo: true,
            displayMode: "compact",
            isTransparent: false,
          };
          break;

        /** 💱 SCREENER **/
        case "screener":
          src =
            "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
          defaultConfig = {
            market: "forex",
            showToolbar: true,
            defaultColumn: "overview",
            defaultScreen: "general",
            isTransparent: false,
            locale: "en",
            colorTheme: "dark",
            width: "100%",
            height: 550,
          };
          break;

        default:
          console.error("❌ Invalid TradingView widget type:", type);
          return;
      }

      // 🔧 Gabungkan konfigurasi default + custom
      const finalConfig = { ...defaultConfig, ...config, width, height };

      script.src = src;
      script.innerHTML = JSON.stringify(finalConfig);
      container.current.appendChild(script);

      // ✅ Jika widget adalah ticker-tape → tidak pakai iframe
      if (type === "ticker-tape") {
        setTimeout(() => setLoading(false), 1000);
        return;
      }

      // ✅ Widget lain → tunggu iframe muncul
      const interval = setInterval(() => {
        const iframe = container.current?.querySelector("iframe");
        if (iframe) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
        }
      }, 300);

      // 🧼 Cleanup
      return () => {
        clearInterval(interval);
        if (container.current) container.current.innerHTML = "";
      };
    } catch (err) {
      console.error("TradingView widget load error:", err);
      setLoading(false);
    }
  }, [type, config, width, height]);

  return (
    <div
      className="relative flex items-center justify-center bg-[#0F0F0F] rounded-2xl overflow-hidden border border-[#1f1f1f]"
      style={{ width, height }}>
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0F0F0F] z-10 backdrop-blur-sm">
          <div className="w-10 h-10 border-4 border-gray-500 border-t-orange-500 rounded-full animate-spin" />
          <p className="mt-3 text-sm text-gray-400">
            Loading {type === "ticker-tape" ? "market ticker..." : type}...
          </p>
        </div>
      )}

      {/* TradingView Container */}
      <div
        className="tradingview-widget-container w-full h-full"
        ref={container}>
        <div className="tradingview-widget-container__widget" />
        <div className="text-xs text-gray-500 text-center py-1">
          <a
            href="https://www.tradingview.com/"
            rel="noopener nofollow"
            target="_blank"
            className="text-blue-400 hover:underline">
            TradingView
          </a>
        </div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
