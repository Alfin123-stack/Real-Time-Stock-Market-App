// app/page.tsx
"use client";

import React, { useMemo } from "react";
import { BarChart3, Users, Star, ShieldCheck } from "lucide-react";

import Container from "@/components/Container";
import { useLiveData } from "@/hooks/useLiveData";
import TestimonialsSection from "./_components/TestimonialsSection";
import PricingSection from "./_components/PricingSection";
import CTASection from "./_components/CTASection";
import FeaturesSection from "./_components/FeaturesSection";
import StockPreviewCard from "./_components/StockPreviewCard";
import HeroSection from "./_components/HeroSection";
import HeroContent from "./_components/HeroContent";

/* ---------- main page ---------- */
export default function Page() {
  const live = useLiveData(24, 1500);

  const stats = useMemo(
    () => [
      {
        title: "Aktif Users",
        value: "12.4K",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Data Points / s",
        value: "24",
        icon: <BarChart3 className="h-5 w-5" />,
      },
      {
        title: "Keamanan",
        value: "AES-256",
        icon: <ShieldCheck className="h-5 w-5" />,
      },
      { title: "Uptime", value: "99.99%", icon: <Star className="h-5 w-5" /> },
    ],
    []
  );

  return (
    <Container>
      {/* HERO */}
      <HeroSection>
        <HeroContent stats={stats} />
        <StockPreviewCard data={live} />
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
