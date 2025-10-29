import React from "react";

interface HeroSectionProps {
  children: React.ReactNode;
}

function HeroSection({ children }: HeroSectionProps) {
  return (
    <section className="relative pt-28 pb-16">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {children}
      </div>
    </section>
  );
}

export default HeroSection;
