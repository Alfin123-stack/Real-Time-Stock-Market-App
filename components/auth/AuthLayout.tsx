"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0b0b0b] text-white">
      {/* Left Section */}
      <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-[#101010] via-[#0a0a0a] to-black overflow-hidden">
        <Image
          src="/images/auth.jpg"
          alt="Trading dashboard"
          fill
          priority
          className="object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-10">
          <h2 className="text-3xl font-semibold text-orange-500 tracking-wide drop-shadow-md">
            Real-Time Stock Market
          </h2>
          <p className="text-gray-300 mt-2 text-sm">
            Monitor, analyze, and trade with real-time precision.
          </p>
        </motion.div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-[#0b0b0b] min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-orange-500 mb-3">{title}</h1>
          <p className="text-gray-400 mb-8">{subtitle}</p>

          {children}
        </motion.div>
      </div>
    </main>
  );
}
