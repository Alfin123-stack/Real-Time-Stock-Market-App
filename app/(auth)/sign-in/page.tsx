"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    // Basic validation
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signInWithEmail({ email, password });

      if (!result.success) {
        toast.error(result.error || "Invalid email or password");
        return;
      }

      toast.success("Successfully signed in!");
      router.replace("/");
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Right Section */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-[#0b0b0b] min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-orange-500 mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-400 mb-8">
            Sign in to your trading dashboard and stay updated with real-time
            market data.
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email</label>
              <Input
                type="email"
                autoComplete="email"
                placeholder="you@stocks.io"
                className="bg-[#121212] border border-[#222] focus:ring-2 focus:ring-orange-500"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Password
              </label>
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="bg-[#121212] border border-[#222] focus:ring-2 focus:ring-orange-500"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>

            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg mt-2 flex items-center justify-center"
              type="submit"
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Don’t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-orange-500 hover:text-orange-400 font-medium">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
