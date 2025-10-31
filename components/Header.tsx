"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  BarChart3,
  User2,
  LogOut,
  Loader2,
  ChevronDown,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { Search } from "./Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export default function Header({ username }: { username?: string | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/markets", label: "Markets" },
    { href: "/news", label: "News" },
  ];

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-black/40 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* --- Logo --- */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400 shadow-lg flex items-center justify-center">
            <BarChart3 className="text-white" size={20} />
          </motion.div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-lg text-white">RTStock</span>
            <span className="text-slate-500 text-xs tracking-wide">
              Real-Time Insights
            </span>
          </div>
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition ${
                  isActive
                    ? "text-orange-400 border-b-2 border-orange-400 pb-1"
                    : "text-slate-400 hover:text-orange-400"
                }`}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* --- Right Section --- */}
        <div className="flex items-center gap-3 relative">
          {username ? (
            <>
              <Search />

              {/* --- User Dropdown --- */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2 p-2 text-slate-300 bg-transparent hover:text-orange-400 hover:bg-transparent">
                    <User className="h-8 w-8" />
                    <span className="hidden sm:inline">Details</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-52 bg-[#0d0d0d] border border-slate-800 text-slate-300 shadow-xl rounded-xl backdrop-blur-sm">
                  <DropdownMenuLabel className="text-orange-400 font-semibold tracking-wide">
                    My Account
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-slate-800" />

                  <DropdownMenuItem
                    className="flex items-center gap-2 px-3 py-2 text-slate-300 
                 hover:text-orange-400 hover:bg-[#1a1a1a] transition-colors duration-150 rounded-md">
                    <User className="h-4 w-4 text-slate-400" />
                    <span>{username}</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-slate-800" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-3 py-2 text-red-400 
                 hover:text-red-500 hover:bg-[#1a1a1a] transition-colors duration-150 rounded-md cursor-pointer">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Logging out...</span>
                      </div>
                    ) : (
                      <>
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="hidden md:inline-flex bg-orange-500 hover:bg-orange-400 text-black rounded-lg px-4 py-2 font-medium shadow">
                Login
              </Button>
            </Link>
          )}

          {/* --- Mobile Menu Button --- */}
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

      {/* --- Mobile Drawer --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
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

            {username ? (
              <>
                <div className="mt-2 text-slate-400 flex items-center gap-2">
                  <User2 className="h-4 w-4" />
                  <span>{username}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="w-full mt-2 bg-orange-500 hover:bg-orange-400 text-black font-medium">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Logout"}
                </Button>
              </>
            ) : (
              <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-orange-500 hover:bg-orange-400 text-black font-medium mt-2">
                  Sign In
                </Button>
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
