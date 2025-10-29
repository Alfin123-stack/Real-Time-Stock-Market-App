"use client";

import React from "react";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import Container from "@/components/Container";
import MarketHeaderSection from "./_components/MarketHeaderSection";
import MarketListSection from "./_components/MarketListSection";

export interface StockItem {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
  isInWatchlist: boolean;
}

export default function MarketsPage() {
  const [results, setResults] = React.useState<StockItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [query] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchPopularStocks() {
      try {
        const res = await searchStocks();
        setResults(res);
      } catch (err) {
        console.error("❌ Gagal fetch popular stocks:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularStocks();
  }, [query]);

  console.log(results);

  return (
    <Container>
      {/* HEADER */}
      <MarketHeaderSection />

      {/* LIST SECTION */}
      <MarketListSection results={results} loading={loading} />
    </Container>
  );
}
