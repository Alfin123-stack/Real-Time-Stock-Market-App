import React from "react";
import { motion } from "framer-motion";

type Testimonials = {
  name: string;
  role: string;
  text: string;
};

function TestimonialCard({
  testimonials,
  index,
}: {
  testimonials: Testimonials;
  index: number;
}) {
  return (
    <motion.blockquote
      key={index}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="rounded-xl p-6 bg-white/3 border border-slate-800">
      <p className="text-slate-200 italic">“{testimonials.text}”</p>
      <footer className="mt-4 text-sm text-slate-400">
        — {testimonials.name},{" "}
        <span className="text-slate-300">{testimonials.role}</span>
      </footer>
    </motion.blockquote>
  );
}

export default TestimonialCard;
