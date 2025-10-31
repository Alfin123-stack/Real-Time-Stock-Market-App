import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/auth.server";
import React from "react";

/* -------------------- 🌐 Global Metadata -------------------- */
export const metadata: Metadata = {
  title: {
    default: "Real-Time Stock Market App",
    template: "%s | Live Stock Prices, Charts & Market News",
  },
  description:
    "Track real-time stock prices, view live charts, and stay informed with the latest market news. The ultimate platform for traders and investors.",
  metadataBase: new URL("https://your-domain.com"), // 🔁 Ganti dengan domain kamu
  keywords: [
    "real-time stock prices",
    "stock market app",
    "live charts",
    "market news",
    "trading dashboard",
    "investing tools",
  ],
  openGraph: {
    title:
      "Real-Time Stock Market App | Live Stock Prices, Charts & Market News",
    description:
      "Monitor live stock prices, analyze charts, and stay updated with market trends — all in real time.",
    url: "https://your-domain.com",
    siteName: "Real-Time Stock Market App",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Live Stock Market Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Real-Time Stock Market App | Live Stock Prices, Charts & Market News",
    description:
      "Stay ahead in the market with real-time stock prices, charts, and insights.",
    images: ["/images/og-image.jpg"],
    creator: "@yourhandle", // opsional
  },
  icons: {
    icon: "/favicon.ico",
  },
};

/* -------------------- 🧱 Root Layout -------------------- */
const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-black text-slate-100 antialiased">
      <Header username={user?.name || null} />
      {children}
      <Footer />
    </main>
  );
};

export default layout;
