import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* --- Left side --- */}
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Real-Time Stock Market App
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            © {year} — Powered by{" "}
            <span className="text-orange-500 font-medium">TradingView</span>
          </p>
        </div>

        {/* --- Right side (social links) --- */}
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-orange-400 transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-orange-400 transition-colors">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-orange-400 transition-colors">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* --- Bottom accent line --- */}
      <div className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
    </footer>
  );
}

export default Footer;
