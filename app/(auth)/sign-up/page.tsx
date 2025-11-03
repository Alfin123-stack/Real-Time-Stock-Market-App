"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to access real-time market analytics and personalized trading insights.">
      <AuthForm mode="signup" />
    </AuthLayout>
  );
}
