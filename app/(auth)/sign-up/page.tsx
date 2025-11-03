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

  // ✅ Validasi sisi client
  const validateForm = () => {
    const {
      fullName,
      email,
      password,
      country,
      investmentGoals,
      riskTolerance,
      preferredIndustry,
    } = formData;

    if (!fullName || !email || !password) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }

    if (!country) {
      toast.error("Please select your country.");
      return false;
    }

    if (!investmentGoals) {
      toast.error("Please select your investment goals.");
      return false;
    }

    if (!riskTolerance) {
      toast.error("Please select your risk tolerance.");
      return false;
    }

    if (!preferredIndustry) {
      toast.error("Please select your preferred industry.");
      return false;
    }

    return true;
  };

  // 📨 Kirim data ke server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔍 Jalankan validasi dulu
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await signUpWithEmail(formData);

      if (!result.success) {
        toast.error(result.error || "Failed to create account.");
        return;
      }

      toast.success("Account created successfully!");
      router.replace("/");
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0b0b0b] text-white">
      {/* Left Section */}
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

      {/* Right Section */}
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

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <InputField
                label="Full Name"
                type="text"
                placeholder="John Trader"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />

              {/* Email */}
              <InputField
                label="Email"
                type="email"
                placeholder="you@stocks.io"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />

              {/* Password */}
              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />

              {/* Country */}
              <SelectField
                label="Country"
                value={formData.country}
                onValueChange={(v) => handleChange("country", v)}
                options={[
                  ["us", "🇺🇸 United States"],
                  ["uk", "🇬🇧 United Kingdom"],
                  ["id", "🇮🇩 Indonesia"],
                  ["jp", "🇯🇵 Japan"],
                  ["sg", "🇸🇬 Singapore"],
                ]}
              />

              {/* Investment Goals */}
              <SelectField
                label="Investment Goals"
                value={formData.investmentGoals}
                onValueChange={(v) => handleChange("investmentGoals", v)}
                options={[
                  ["growth", "Long-Term Growth"],
                  ["income", "Steady Income"],
                  ["trading", "Short-Term Trading"],
                  ["diversify", "Portfolio Diversification"],
                ]}
              />

              {/* Risk Tolerance */}
              <SelectField
                label="Risk Tolerance"
                value={formData.riskTolerance}
                onValueChange={(v) => handleChange("riskTolerance", v)}
                options={[
                  ["low", "Low"],
                  ["moderate", "Moderate"],
                  ["high", "High"],
                ]}
              />

              {/* Preferred Industry */}
              <SelectField
                label="Preferred Industry"
                value={formData.preferredIndustry}
                onValueChange={(v) => handleChange("preferredIndustry", v)}
                options={[
                  ["tech", "Technology"],
                  ["finance", "Finance"],
                  ["health", "Healthcare"],
                  ["energy", "Energy"],
                  ["consumer", "Consumer Goods"],
                ]}
              />
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg mt-4 flex justify-center items-center">
              {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
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

/* 🔧 Reusable Components */
function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-1 block">{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-[#121212] border border-[#222] focus:ring-2 focus:ring-orange-500"
        required
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onValueChange,
  options,
}: {
  label: string;
  value: string;
  onValueChange: (val: string) => void;
  options: [string, string][];
}) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-1 block">{label}</label>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger className="bg-[#121212] w-full border border-[#222] text-gray-300 focus:ring-2 focus:ring-orange-500">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent className="bg-[#121212] text-gray-200 border border-[#222]">
          {options.map(([val, label]) => (
            <SelectItem key={val} value={val}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
