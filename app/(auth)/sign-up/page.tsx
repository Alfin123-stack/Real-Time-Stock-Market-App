"use client";

import React, { useState } from "react";
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
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  // 🧠 State untuk semua field
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    investmentGoals: "",
    riskTolerance: "",
    preferredIndustry: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // 🛠 Handler umum untuk Input dan Select
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 📨 Nanti bisa dipakai kirim data ke server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    setIsLoading(true);
    try {
      const {
        fullName,
        email,
        password,
        country,
        investmentGoals,
        riskTolerance,
        preferredIndustry,
      } = formData;

      await signUpWithEmail({
        fullName,
        email,
        password,
        country,
        investmentGoals,
        riskTolerance,
        preferredIndustry,
      });
      toast("Account created successfully!");
      router.replace("/");
    } catch (error) {
      console.error("Sign up error:", error);
      toast("Failed to create account. Please try again.");
    } finally {
      setIsLoading(true);
    }
  };

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
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-[#0b0b0b]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="sm:max-w-xl max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-orange-500 mb-3">
            Create Account
          </h1>
          <p className="text-gray-400 mb-8">
            Sign up to access real-time stock market analytics and insights.
          </p>

          {/* Form Grid Layout */}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="John Trader"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
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
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
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
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="bg-[#121212] border border-[#222] focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              {/* 🌍 Country */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Country
                </label>
                <Select
                  onValueChange={(value) => handleChange("country", value)}>
                  <SelectTrigger className="bg-[#121212] w-full border border-[#222] text-gray-300 focus:ring-2 focus:ring-orange-500">
                    <SelectValue
                      placeholder="Select country"
                      defaultValue={formData.country}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121212] text-gray-200 border border-[#222]">
                    <SelectItem value="us">🇺🇸 United States</SelectItem>
                    <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                    <SelectItem value="ca">🇨🇦 Canada</SelectItem>
                    <SelectItem value="jp">🇯🇵 Japan</SelectItem>
                    <SelectItem value="id">🇮🇩 Indonesia</SelectItem>
                    <SelectItem value="sg">🇸🇬 Singapore</SelectItem>
                    <SelectItem value="de">🇩🇪 Germany</SelectItem>
                    <SelectItem value="fr">🇫🇷 France</SelectItem>
                    <SelectItem value="au">🇦🇺 Australia</SelectItem>
                    <SelectItem value="in">🇮🇳 India</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Investment Goals */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Investment Goals
                </label>
                <Select
                  onValueChange={(value) =>
                    handleChange("investmentGoals", value)
                  }>
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
                <Select
                  onValueChange={(value) =>
                    handleChange("riskTolerance", value)
                  }>
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
                <Select
                  onValueChange={(value) =>
                    handleChange("preferredIndustry", value)
                  }>
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
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg mt-4 flex justify-center items-center">
              {isLoading ? <Loader2 /> : " Sign Up"}
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
