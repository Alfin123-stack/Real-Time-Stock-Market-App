"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

export default function SignInPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your trading dashboard and stay updated with real-time market data.">
      <AuthForm mode="signin" />
    </AuthLayout>
  );
}
