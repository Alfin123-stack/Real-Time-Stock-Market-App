"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0b0b0b] text-white">
      {/* 🧩 Left Section — Illustration */}
      <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-[#101010] via-[#0a0a0a] to-black">
        <div className="absolute inset-0">
          <Image
            src="/images/auth.jpg"
            alt="Trading dashboard"
            fill
            priority
            className="object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-10">
          <h2 className="text-2xl font-semibold text-orange-500 tracking-wide">
            Join the Future of Trading
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Create your account and start tracking live market insights.
          </p>
        </motion.div>
      </div>

      {/* 🧾 Right Section — Sign Up Form */}
      <div className="flex flex-col justify-center bg-[#0b0b0b]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl w-full mx-auto">
          <h1 className="text-3xl font-bold text-orange-500 mb-3">
            Create Account
          </h1>
          <p className="text-gray-400 mb-8">
            Sign up to access real-time stock market analytics and insights.
          </p>

          {/* Form Grid Layout */}
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="John Trader"
                  className="bg-[#121212] border border-[#222] focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@stocks.io"
                  className="bg-[#121212] border border-[#222] focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-[#121212] border border-[#222] focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              {/* Investment Goals */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Investment Goals
                </label>
                <Select>
                  <SelectTrigger className="bg-[#121212] w-full border border-[#222] text-gray-300 focus:ring-2 focus:ring-orange-500">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121212] text-gray-200 border border-[#222]">
                    <SelectItem value="growth">Long-Term Growth</SelectItem>
                    <SelectItem value="income">Steady Income</SelectItem>
                    <SelectItem value="trading">Short-Term Trading</SelectItem>
                    <SelectItem value="diversify">
                      Portfolio Diversification
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Risk Tolerance */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Risk Tolerance
                </label>
                <Select>
                  <SelectTrigger className="bg-[#121212] w-full border border-[#222] text-gray-300 focus:ring-2 focus:ring-orange-500">
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121212] text-gray-200 border border-[#222]">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred Industry */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Preferred Industry
                </label>
                <Select>
                  <SelectTrigger className="bg-[#121212] w-full border border-[#222] text-gray-300 focus:ring-2 focus:ring-orange-500">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121212] text-gray-200 border border-[#222]">
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="health">Healthcare</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="consumer">Consumer Goods</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg mt-4">
              Sign Up
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-orange-500 hover:text-orange-400 font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
