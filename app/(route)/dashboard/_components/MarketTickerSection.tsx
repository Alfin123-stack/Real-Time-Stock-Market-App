import TradingViewWidget from "@/components/TradingViewWidget";
import React from "react";

function MarketTickerSection() {
  return (
    <section className="border-b border-[#1a1a1a] bg-[#0d0d0d] mt-28">
      <TradingViewWidget type="ticker-tape" height="85" />
    </section>
  );
}

export default MarketTickerSection;
