import PricingCard from "@/app/(route)/_components/PricingCard";
import { PRICING_PLANS } from "@/lib/constants";
import React from "react";

function PricingSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-white/2 border-t border-slate-900/50">
      <div className=" text-center">
        <h3 className="text-3xl font-bold mb-6">
          Simple plans for every trader
        </h3>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((p, i) => (
            <PricingCard key={i} prices={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
