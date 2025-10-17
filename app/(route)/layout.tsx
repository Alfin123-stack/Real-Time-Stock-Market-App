import Header from "@/components/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-black text-slate-100 antialiased">
      <Header />
      {children}
    </main>
  );
};

export default layout;
