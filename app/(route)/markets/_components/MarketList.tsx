import React from "react";
import MarketListSection from "./MarketListSection";
import { searchStocks } from "@/lib/actions/finnhub.actions";

export default async function MarketList() {
  const results = await searchStocks(); // jangan di-await di sini!
  return <MarketListSection results={results} />;
}
