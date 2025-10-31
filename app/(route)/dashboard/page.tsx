import type { Metadata } from "next";

import React from "react";
import Container from "@/components/Container";
import MarketTickerSection from "./_components/MarketTickerSection";
import MarketAnalyticsSection from "./_components/MarketAnalyticsSection";

/* ---------- SEO Metadata ---------- */
export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View live stock tickers, market analytics, and performance metrics in real-time. Your personalized dashboard for monitoring financial markets and investment trends.",
  keywords: [
    "market dashboard",
    "stock ticker",
    "real-time analytics",
    "trading insights",
    "stock performance",
    "market overview",
    "financial dashboard",
    "investment tracker",
  ],
  openGraph: {
    title: "Dashboard | Real-Time Market Analytics & Stock Ticker",
    description:
      "Track live stock movements and in-depth analytics to make smarter trading decisions. Stay on top of the market with real-time updates.",
    url: "https://your-domain.com/dashboard",
    siteName: "Real-Time Stock Market App",
    images: [
      {
        url: "https://your-domain.com/og-dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Stock Market Dashboard - Real-Time Analytics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard | Real-Time Market Analytics & Live Tickers",
    description:
      "Access live analytics and stock tickers for smarter trading and investment monitoring.",
    images: ["https://your-domain.com/og-dashboard.jpg"],
    creator: "@your_twitter_handle",
  },
  metadataBase: new URL("https://your-domain.com"),
  icons: {
    icon: "/favicon.ico",
  },
};

/* ---------- Main Dashboard Page ---------- */
export default function DashboardPage() {
  return (
    <>
      <Container fluid>
        <MarketTickerSection />
      </Container>

      <Container>
        <MarketAnalyticsSection />
      </Container>
    </>
  );
}
