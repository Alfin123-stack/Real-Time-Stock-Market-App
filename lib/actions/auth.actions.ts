"use server";

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { cookies, headers } from "next/headers";

type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
  country: string;
  investmentGoals: string;
  riskTolerance: string;
  preferredIndustry: string;
};

type SignInFormData = {
  email: string;
  password: string;
};

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email, password, name: fullName },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (e) {
    console.log("Sign up failed", e);
    return { success: false, error: "Sign up failed" };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
    });

    // ⚠️ Better Auth mengembalikan objek, bukan throw error otomatis
    if (!response || response.error || !response.user) {
      throw new Error(response?.error || "Invalid email or password");
    }

    return { success: true, data: response };
  } catch (e: any) {
    console.log("Sign in failed:", e.message);
    return { success: false, error: e.message || "Sign in failed" };
  }
};

export const signOut = async () => {
  try {
    // Hapus session di server Better Auth
    const res = await auth.api.signOut({
      headers: await headers(),
    });

    // Hapus cookie session di browser
    const cookieStore = cookies();
    (await cookieStore).delete("better-auth.session_token"); // sesuaikan nama cookie kalau beda

    return { success: true };
  } catch (e) {
    console.log("Sign out failed", e);
    return { success: false, error: "Sign out failed" };
  }
};
