import FeatureCard from "@/app/(route)/_components/FeatureCard";
import { BarChart3, ShieldCheck, TrendingUp } from "lucide-react";
import React from "react";

function FeaturesSection() {
  return (
    <section className="py-12 border-t border-slate-900/60">
      <div className=" grid md:grid-cols-3 gap-6">
        <FeatureCard
          title="Streaming Real-Time"
          desc="Datastream per detik dari berbagai bursa. Latensi minimal, reliability tinggi."
          icon={<TrendingUp className="h-6 w-6 text-orange-400" />}
        />
        <FeatureCard
          title="Advanced Charting"
          desc="Lebih dari 20 indikator teknikal dan drawing tools di chart interaktif."
          icon={<BarChart3 className="h-6 w-6 text-orange-400" />}
        />
        <FeatureCard
          title="Enterprise Ready"
          desc="API & integrasi, single sign-on, dan SLA untuk tim trading dan fintech."
          icon={<ShieldCheck className="h-6 w-6 text-orange-400" />}
        />
      </div>
    </section>
  );
}

export default FeaturesSection;
