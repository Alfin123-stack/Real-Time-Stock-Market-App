"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInWithEmail, signUpWithEmail } from "@/lib/actions/auth.actions";

export function useAuthForm(mode: "signin" | "signup") {
  const router = useRouter();
  const isSignUp = mode === "signup";

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    investmentGoals: "",
    riskTolerance: "",
    preferredIndustry: "",
  });

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
      let result;
      if (isSignUp) {
        result = await signUpWithEmail(formData);
      } else {
        result = await signInWithEmail({
          email: formData.email,
          password: formData.password,
        });
      }

      if (!result?.success) {
        toast.error(result?.error || "Authentication failed");
        return;
      }

      toast.success(isSignUp ? "Account created successfully!" : "Signed in!");
      router.replace("/");
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    isSignUp,
  };
}
