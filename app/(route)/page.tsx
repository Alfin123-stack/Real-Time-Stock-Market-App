// app/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Menu,
  Sun,
  Moon,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Users,
  Star,
  ShieldCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Link from "next/link";

type Point = { t: string; v: number };

function formatTime(d: Date) {
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/* ---------- mock streaming data (simulasi) ---------- */
function useLiveData(points = 20, intervalMs = 2000) {
  const [data, setData] = useState<Point[]>(
    Array.from({ length: points }, (_, i) => {
      const base = 300 + Math.sin(i / 2) * 20 + i;
      return {
        t: formatTime(new Date(Date.now() - (points - i) * intervalMs)),
        v: Math.round(base + Math.random() * 10),
      };
    })
  );

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const nextVal = Math.max(
          10,
          Math.round(prev[prev.length - 1].v + (Math.random() - 0.4) * 8)
        );
        const next = [
          ...prev.slice(1),
          { t: formatTime(new Date()), v: nextVal },
        ];
        return next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return data;
}

/* ---------- main page ---------- */
export default function Page() {
  const { theme, setTheme } = useTheme();
  const live = useLiveData(24, 1500);

  const stats = useMemo(
    () => [
      {
        title: "Aktif Users",
        value: "12.4K",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Data Points / s",
        value: "24",
        icon: <BarChart3 className="h-5 w-5" />,
      },
      {
        title: "Keamanan",
        value: "AES-256",
        icon: <ShieldCheck className="h-5 w-5" />,
      },
      { title: "Uptime", value: "99.99%", icon: <Star className="h-5 w-5" /> },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-black text-slate-100 antialiased">
      <header className="fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400 shadow-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden>
                <path
                  d="M3 12h18"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M7 6v12"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-semibold text-lg">RTStock</span>
            <span className="text-slate-500 ml-2 text-sm">
              Real-time trading insights
            </span>
          </div>

          <nav className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 border border-slate-800/60 hover:border-slate-700/80 backdrop-blur-sm">
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-orange-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </button>
            <button className="hidden md:inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black px-4 py-2 rounded-lg font-medium shadow">
              Login
            </button>
            <button className="md:hidden p-2 rounded-md border border-slate-800/60">
              <Menu className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Real-Time Market Data,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300">
                Delivered Fast
              </span>
            </h1>
            <p className="mt-6 text-slate-300 max-w-xl">
              Platform analitik saham real-time: charts, alerts, and portfolio
              insights — build smarter strategies with instant data streams.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
               className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-black px-5 py-3 rounded-lg font-semibold shadow">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center gap-3 border border-slate-800 text-slate-200 px-5 py-3 rounded-lg hover:bg-white/5">
                Live Demo
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/2 rounded-lg p-3">
                  <div className="p-2 rounded-md bg-orange-600/20">
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-sm text-slate-300">{s.title}</div>
                    <div className="font-semibold text-lg">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: card with live chart + price list */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-b from-[#0b0b0b] to-[#0b0b0b]/60 shadow-2xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-slate-400">
                    AAPL · Apple Inc.
                  </div>
                  <div className="mt-1 flex items-baseline gap-3">
                    <span className="text-3xl font-bold">390.12</span>
                    <span className="text-sm text-emerald-400">
                      +1.24 (0.32%)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Market</div>
                  <div className="mt-1 text-sm text-slate-200">NASDAQ</div>
                </div>
              </div>

              <div className="mt-6 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={live}
                    margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="#111827" vertical={false} />
                    <XAxis
                      dataKey="t"
                      axisLine={false}
                      tick={{ fill: "#94a3b8" }}
                    />
                    <YAxis
                      domain={["dataMin - 20", "dataMax + 20"]}
                      axisLine={false}
                      tick={{ fill: "#94a3b8" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b1220",
                        border: "1px solid #222",
                      }}
                      itemStyle={{ color: "#ffb07a" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="#ff8800"
                      strokeWidth={2.5}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {["AAPL", "MSFT", "GOOG"].map((sym, idx) => (
                  <div key={sym} className="p-3 rounded-lg bg-white/3">
                    <div className="text-xs text-slate-400">{sym}</div>
                    <div className="mt-1 font-semibold">
                      {300 + idx * 50 + Math.round(Math.random() * 30)}
                    </div>
                    <div className="text-sm text-emerald-400">
                      +{(Math.random() * 2).toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Streaming Real-Time"
            desc="Datastream per detik dari berbagai bursa. Latensi minimal, reliability tinggi."
            icon={<TrendingUp className="h-6 w-6 text-orange-400" />}
          />
          <FeatureCard
            title="Advanced Charting"
            desc="Lebih dari 20 indikator teknikal dan drawing tools di chart interaktif."
            icon={<BarChart3 className="h-6 w-6 text-orange-400" />}
          />
          <FeatureCard
            title="Enterprise Ready"
            desc="API & integrasi, single sign-on, dan SLA untuk tim trading dan fintech."
            icon={<ShieldCheck className="h-6 w-6 text-orange-400" />}
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-6">What pro traders say</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Dina",
                role: "HFT Trader",
                text: "Latency-nya rendah dan chartsnya membantu strategi saya.",
              },
              {
                name: "Budi",
                role: "Quant Analyst",
                text: "Integrasi API cepat dan data sangat konsisten.",
              },
              {
                name: "Sari",
                role: "Portfolio Manager",
                text: "UI yang bersih membantu tim membaca pasar lebih cepat.",
              },
            ].map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-xl p-6 bg-white/3 border border-slate-800">
                <p className="text-slate-200 italic">“{t.text}”</p>
                <footer className="mt-4 text-sm text-slate-400">
                  — {t.name}, <span className="text-slate-300">{t.role}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 bg-gradient-to-b from-transparent to-white/2 border-t border-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Simple plans for every trader
          </h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "Free",
                perks: ["Delayed data", "1 portfolio", "Community support"],
              },
              {
                name: "Pro",
                price: "$19/mo",
                perks: ["Real-time data", "5 portfolios", "Priority support"],
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Contact",
                perks: ["Custom feeds", "SLAs", "Dedicated support"],
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`p-6 rounded-xl border ${
                  p.highlight
                    ? "border-orange-500 bg-gradient-to-br from-orange-500/5"
                    : "border-slate-800"
                } `}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold">{p.name}</h4>
                  <div className="text-2xl font-bold">{p.price}</div>
                </div>
                <ul className="mt-4 text-slate-300 space-y-2 text-left">
                  {p.perks.map((perk, idx) => (
                    <li key={idx}>• {perk}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button
                    className={`w-full py-3 rounded-md ${
                      p.highlight
                        ? "bg-orange-500 text-black"
                        : "border border-slate-700 text-slate-200"
                    }`}>
                    Choose
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-yellow-400 text-black px-6 py-3 rounded-full font-semibold">
            Start your free trial
          </div>
          <h3 className="text-2xl font-bold mt-6">
            Join traders who trust RTStock
          </h3>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
            Fast. Reliable. Insanely simple. Sign up and start receiving
            real-time market data.
          </p>
        </div>
      </section>

      <footer className="py-8 border-t border-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} RTStock. All rights reserved.
          </div>
          <div className="flex gap-3 text-slate-400 text-sm">
            <a>Privacy</a>
            <a>Terms</a>
            <a>Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ---------- small reusable ---------- */
function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-xl p-6 border border-slate-800 bg-white/3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-orange-600/20">{icon}</div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-slate-300 mt-1">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
