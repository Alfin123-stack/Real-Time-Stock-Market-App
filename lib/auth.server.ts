import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";

export async function getCurrentSession() {
  const hdrs = await headers(); // ✅ harus di-await
  const session = await auth.api.getSession({
    headers: hdrs,
  });
  return session;
}

export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user ?? null;
}
