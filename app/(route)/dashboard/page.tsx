"use client";

import React from "react";
import Container from "@/components/Container";
import MarketTickerSection from "./_components/MarketTickerSection";
import MarketAnalyticsSection from "./_components/MarketAnalyticsSection";

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
