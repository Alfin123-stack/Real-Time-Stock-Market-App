import TestimonialCard from "@/app/(route)/_components/TestimonialCard";
import { TESTIMONIALS_DATA } from "@/lib/constants";
import React from "react";

function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="">
        <h3 className="text-3xl font-bold mb-6">What pro traders say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t, i) => (
            <TestimonialCard key={i} testimonials={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
