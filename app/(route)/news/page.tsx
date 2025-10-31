import type { Metadata } from "next";
import React from "react";
import Container from "@/components/Container";
import PageHeaderSection from "@/components/PageHeaderSection";
import NewsSection from "./_components/NewsSection";

/* ---------- SEO Metadata ---------- */
export const metadata: Metadata = {
  title: "Market News",
  description:
    "Stay up to date with the latest financial and economic headlines, market insights, and global stock updates in real time.",
  keywords: [
    "market news",
    "financial headlines",
    "stock market updates",
    "real-time market news",
    "economic news",
    "trading insights",
    "investment trends",
    "business news",
    "financial markets",
  ],
  openGraph: {
    title: "Market News | Real-Time Financial & Economic Updates",
    description:
      "Discover the latest market news, stock updates, and global financial trends — updated in real time for smarter investing.",
    url: "https://your-domain.com/news",
    siteName: "Real-Time Stock Market App",
    images: [
      {
        url: "https://your-domain.com/og-news.jpg",
        width: 1200,
        height: 630,
        alt: "Market News - Real-Time Financial Updates",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Market News | Real-Time Financial Updates",
    description:
      "Stay informed with real-time financial news, market movements, and global economic insights.",
    images: ["https://your-domain.com/og-news.jpg"],
    creator: "@your_twitter_handle",
  },
  metadataBase: new URL("https://your-domain.com"),
  icons: {
    icon: "/favicon.ico",
  },
};

/* ---------- Main News Page ---------- */

export default function NewsPage() {
  return (
    <Container>
      {/* ----- Header Section (Reusable) ----- */}
      <PageHeaderSection
        title="Market News"
        description="Stay informed with the latest financial and economic headlines — updated in real time."
        type="news"
      />

      {/* ----- News Widget Section ----- */}
      <NewsSection />
    </Container>
  );
}
