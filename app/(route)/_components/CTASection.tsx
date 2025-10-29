import React from "react";

function CTASection() {
  return (
    <section className="py-16">
      <div className=" text-center">
        <div className="inline-block bg-gradient-to-r from-orange-500 to-yellow-400 text-black px-6 py-3 rounded-full font-semibold">
          Start your free trial
        </div>
        <h3 className="text-2xl font-bold mt-6">
          Join traders who trust RTStock
        </h3>
        <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
          Fast. Reliable. Insanely simple. Sign up and start receiving real-time
          market data.
        </p>
      </div>
    </section>
  );
}

export default CTASection;
