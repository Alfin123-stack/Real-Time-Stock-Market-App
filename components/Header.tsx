"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/markets", label: "Markets" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/news", label: "News" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-black/40 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Section: Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400 shadow-lg flex items-center justify-center">
            <BarChart3 className="text-white" size={20} />
          </motion.div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-lg">RTStock</span>
            <span className="text-slate-500 text-xs tracking-wide">
              Real-Time Insights
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-400 hover:text-orange-400 transition font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 border border-slate-700 hover:border-slate-600 transition">
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-orange-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>

          {/* Auth Button */}
          <Link href="/sign-in">
            <Button className="hidden md:inline-flex bg-orange-500 hover:bg-orange-400 text-black rounded-lg px-4 py-2 font-medium shadow">
              Login
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md border border-slate-700 hover:border-slate-600 transition">
            {menuOpen ? (
              <X className="h-5 w-5 text-slate-200" />
            ) : (
              <Menu className="h-5 w-5 text-slate-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0b0b0b]/95 border-t border-slate-800 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-orange-400 transition font-medium">
                {link.label}
              </Link>
            ))}
            <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
              <Button className="w-full bg-orange-500 hover:bg-orange-400 text-black font-medium mt-2">
                Sign In
              </Button>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
