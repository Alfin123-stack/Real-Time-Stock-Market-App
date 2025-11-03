"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import AuthField from "./AuthField";
import { useAuthForm } from "@/hooks/useAuthForm";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { formData, handleChange, handleSubmit, isLoading, isSignUp } =
    useAuthForm(mode);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {isSignUp ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AuthField
            label="Full Name"
            placeholder="John Trader"
            value={formData.fullName}
            onChange={(val) => handleChange("fullName", val)}
          />

          <AuthField
            label="Email"
            type="email"
            placeholder="you@stocks.io"
            autoComplete="email"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
          />

          <AuthField
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={formData.password}
            onChange={(val) => handleChange("password", val)}
          />

          <AuthField
            label="Country"
            type="select"
            value={formData.country}
            onChange={(val) => handleChange("country", val)}
            options={[
              ["us", "🇺🇸 United States"],
              ["uk", "🇬🇧 United Kingdom"],
              ["id", "🇮🇩 Indonesia"],
              ["jp", "🇯🇵 Japan"],
              ["sg", "🇸🇬 Singapore"],
            ]}
          />

          <AuthField
            label="Investment Goals"
            type="select"
            value={formData.investmentGoals}
            onChange={(val) => handleChange("investmentGoals", val)}
            options={[
              ["growth", "Long-Term Growth"],
              ["income", "Steady Income"],
              ["trading", "Short-Term Trading"],
              ["diversify", "Portfolio Diversification"],
            ]}
          />

          <AuthField
            label="Risk Tolerance"
            type="select"
            value={formData.riskTolerance}
            onChange={(val) => handleChange("riskTolerance", val)}
            options={[
              ["low", "Low"],
              ["moderate", "Moderate"],
              ["high", "High"],
            ]}
          />

          <AuthField
            label="Preferred Industry"
            type="select"
            value={formData.preferredIndustry}
            onChange={(val) => handleChange("preferredIndustry", val)}
            options={[
              ["tech", "Technology"],
              ["finance", "Finance"],
              ["health", "Healthcare"],
              ["energy", "Energy"],
              ["consumer", "Consumer Goods"],
            ]}
          />
        </div>
      ) : (
        <>
          <AuthField
            label="Email"
            type="email"
            placeholder="you@stocks.io"
            autoComplete="email"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
          />
          <AuthField
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={formData.password}
            onChange={(val) => handleChange("password", val)}
          />
        </>
      )}

      <Button
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg mt-2 flex items-center justify-center"
        type="submit"
        disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isSignUp ? "Creating account..." : "Signing in..."}
          </>
        ) : isSignUp ? (
          "Sign Up"
        ) : (
          "Sign In"
        )}
      </Button>

      <p className="mt-6 text-sm text-gray-400 text-center">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-orange-500 hover:text-orange-400 font-medium">
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-orange-500 hover:text-orange-400 font-medium">
              Sign up
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
