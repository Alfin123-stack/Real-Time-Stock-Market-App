
import type { Metadata } from "next";


import Container from "@/components/Container";
import TestimonialsSection from "./_components/TestimonialsSection";
import PricingSection from "./_components/PricingSection";
import CTASection from "./_components/CTASection";
import FeaturesSection from "./_components/FeaturesSection";
import StockPreviewCard from "./_components/StockPreviewCard";
import HeroSection from "./_components/HeroSection";
import HeroContent from "./_components/HeroContent";

/* ---------- ✅ SEO Metadata ---------- */
export const metadata: Metadata = {
  title: "Home", // otomatis jadi: "Home | Live Stock Prices, Charts & Market News"
  description:
    "Explore live stock prices, charts, and market insights in real time. Your all-in-one dashboard for smarter investing decisions.",
  keywords: [
    "stock market app",
    "real-time stock data",
    "live stock prices",
    "market analysis",
    "financial charts",
    "investment dashboard",
  ],
  openGraph: {
    title: "Home | Live Stock Prices, Charts & Market News",
    description:
      "Track real-time stock prices, analyze charts, and stay updated with market insights for smarter trading.",
    url: "https://your-domain.com",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Live Stock Market Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Live Stock Prices, Charts & Market News",
    description:
      "Monitor real-time stock prices and charts. Stay ahead with the latest market updates.",
    images: ["/images/og-image.jpg"],
  },
};

/* ---------- Main Page ---------- */
export default function Page() {

  return (
    <Container>
      {/* HERO */}
      <HeroSection>
        <HeroContent />
        <StockPreviewCard  />
      </HeroSection>

      {/* FEATURES */}
      <FeaturesSection />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* PRICING */}
      <PricingSection />

      {/* CTA */}
      <CTASection />
    </Container>
  );
}
