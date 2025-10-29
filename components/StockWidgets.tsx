// StockWidgets.jsx
"use client";

import React, { useEffect, useRef, memo } from "react";

const WIDGET_CONFIG = {
  symbolInfo:
    "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js",
  technicalAnalysis:
    "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js",
  financials:
    "https://s3.tradingview.com/external-embedding/embed-widget-financials.js",
  symbolProfile:
    "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js",
};

const DEFAULT_DIMENSIONS = {
  symbolInfo: { width: 550, height: 450 },
  technicalAnalysis: { width: 425, height: 450 },
  financials: { width: 400, height: 550 },
  symbolProfile: { width: 400, height: 550 },
};

function StockWidgets({
  symbol = "NASDAQ:AAPL",
  type = "symbolInfo",
  width,
  height,
}) {
  const container = useRef();

  useEffect(() => {
    if (!container.current || !WIDGET_CONFIG[type]) return;

    const script = document.createElement("script");
    script.src = WIDGET_CONFIG[type];
    script.type = "text/javascript";
    script.async = true;

    const widgetWidth = width || DEFAULT_DIMENSIONS[type].width;
    const widgetHeight = height || DEFAULT_DIMENSIONS[type].height;

    const config = {
      symbol,
      colorTheme: "dark",
      isTransparent: false,
      locale: "en",
      width: widgetWidth,
      height: widgetHeight,
    };

    if (type === "technicalAnalysis") {
      config.displayMode = "single";
      config.interval = "1m";
      config.disableInterval = false;
      config.showIntervalTabs = true;
    } else if (type === "financials" || type === "symbolProfile") {
      config.displayMode = type === "financials" ? "adaptive" : undefined;
    }

    script.innerHTML = JSON.stringify(config);
    container.current.innerHTML = "";
    container.current.appendChild(script);
  }, [symbol, type, width, height]);

  const linkMap = {
    symbolInfo: `https://www.tradingview.com/symbols/${symbol.replace(
      ":",
      "-"
    )}/`,
    technicalAnalysis: `https://www.tradingview.com/symbols/${symbol.replace(
      ":",
      "-"
    )}/technicals/`,
    financials: `https://www.tradingview.com/symbols/${symbol.replace(
      ":",
      "-"
    )}/financials-overview/`,
    symbolProfile: `https://www.tradingview.com/symbols/${symbol.replace(
      ":",
      "-"
    )}/`,
  };

  const labelMap = {
    symbolInfo: "performance",
    technicalAnalysis: "stock analysis",
    financials: "fundamentals",
    symbolProfile: "profile",
  };

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href={linkMap[type]} rel="noopener nofollow" target="_blank">
          <span className="blue-text">{`${symbol} ${labelMap[type]}`}</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
    </div>
  );
}

export default memo(StockWidgets);
