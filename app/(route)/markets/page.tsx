import type { Metadata } from "next";
import React, { Suspense } from "react";
import Container from "@/components/Container";
import PageHeaderSection from "@/components/PageHeaderSection";
import MarketList from "./_components/MarketList";
import Loading from "./loading";

/* ---------- SEO Metadata ---------- */
export const metadata: Metadata = {
  title: "Markets",
  description:
    "Explore live stock market data, trending stocks, and real-time updates. Stay informed with the latest prices and market insights for smarter trading decisions.",
  keywords: [
    "stock market data",
    "live stock prices",
    "stock exchange",
    "market updates",
    "financial market",
    "stock tracker",
    "popular stocks",
    "real-time trading",
    "investment insights",
  ],
  openGraph: {
    title: "Markets | Real-Time Stock Market Data & Live Prices",
    description:
      "Discover trending stocks and real-time price movements across global markets. Stay up to date with live market performance.",
    url: "https://your-domain.com/markets",
    siteName: "Real-Time Stock Market App",
    images: [
      {
        url: "https://your-domain.com/og-markets.jpg",
        width: 1200,
        height: 630,
        alt: "Stock Market Dashboard - Real-Time Prices",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markets | Real-Time Stock Market Data",
    description:
      "Track real-time market data, popular stocks, and live price movements across global exchanges.",
    images: ["https://your-domain.com/og-markets.jpg"],
    creator: "@your_twitter_handle",
  },
  metadataBase: new URL("https://your-domain.com"),
  icons: {
    icon: "/favicon.ico",
  },
};

/* ---------- Main Markets Page ---------- */
export interface StockItem {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
  isInWatchlist: boolean;
}

export default async function MarketsPage() {
  return (
    <Container>
      <PageHeaderSection
        title="Popular Stocks"
        description="Discover trending stocks with real-time analytics and quick access to detailed pages for each company."
        type="stock"
      />

      <Suspense fallback={<Loading />}>
        <MarketList />
      </Suspense>
    </Container>
  );
}
