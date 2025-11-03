"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { signInWithEmail, signUpWithEmail } from "@/lib/actions/auth.actions";
import AuthField from "./AuthField";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isSignUp = mode === "signup";

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

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (isSignUp) {
      if (!formData.fullName.trim())
        return toast.error("Full name is required");
      if (!formData.country) return toast.error("Please select your country");
      if (!formData.investmentGoals)
        return toast.error("Please select your investment goals");
      if (!formData.riskTolerance)
        return toast.error("Please select your risk tolerance");
      if (!formData.preferredIndustry)
        return toast.error("Please select your preferred industry");
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isSignUp) {
        const result = await signUpWithEmail(formData);
        if (!result.success) {
          toast.error(result.error || "Failed to create account");
          return;
        }
        toast.success("Account created successfully!");
      } else {
        const result = await signInWithEmail({
          email: formData.email,
          password: formData.password,
        });
        if (!result.success) {
          toast.error(result.error || "Invalid email or password");
          return;
        }
        toast.success("Successfully signed in!");
      }

      router.replace("/");
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {/* 🟩 Sign Up → grid dua kolom */}
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
        /* 🟧 Sign In → satu kolom */
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
