import type { Metadata } from "next";
import React from "react";
import Container from "@/components/Container";
import PageHeaderSection from "@/components/PageHeaderSection";
import CryptoMarketSection from "./_components/CryptoMarketSection";

/* ---------- SEO Metadata ---------- */
export const metadata: Metadata = {
  title: "Crypto Market",
  description:
    "Explore real-time cryptocurrency data — view screener insights and market heatmap visualization powered by TradingView.",
  keywords: [
    "crypto market",
    "cryptocurrency screener",
    "crypto heatmap",
    "bitcoin",
    "ethereum",
    "altcoin data",
    "crypto insights",
    "tradingview crypto",
  ],
  openGraph: {
    title: "Crypto Market | Real-Time Screener & Heatmap",
    description:
      "Analyze crypto markets in real-time with a live screener and dynamic heatmap visualization.",
    url: "https://your-domain.com/crypto-market",
    siteName: "Real-Time Stock Market App",
    images: [
      {
        url: "https://your-domain.com/og-crypto-market.jpg",
        width: 1200,
        height: 630,
        alt: "Crypto Market - Screener & Heatmap",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Market | Screener & Heatmap",
    description:
      "View live cryptocurrency data and visualize performance in one place.",
    images: ["https://your-domain.com/og-crypto-market.jpg"],
  },
  metadataBase: new URL("https://your-domain.com"),
  icons: { icon: "/favicon.ico" },
};

/* ---------- Main Crypto Market Page ---------- */
export default function CryptoMarketPage() {
  return (
    <Container>
      <PageHeaderSection
        title="Crypto Market"
        description="Analyze real-time cryptocurrency trends with a live screener and interactive heatmap."
        type="crypto"
      />
      <CryptoMarketSection />
    </Container>
  );
}
