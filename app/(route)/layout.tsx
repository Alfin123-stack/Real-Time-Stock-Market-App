import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/auth.server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  console.log("Current user in layout:", user);
  return (
    <main className="min-h-screen bg-black text-slate-100 antialiased">
      <Header username={user?.name || null} />
      {children}
      <Footer />
    </main>
  );
};

export default layout;
