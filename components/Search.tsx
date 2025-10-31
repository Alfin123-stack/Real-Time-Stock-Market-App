"use client";

import { TrendingUp, Search as SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "./ui/input";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import Link from "next/link";
import { StockItem } from "@/app/(route)/markets/page";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await searchStocks(debouncedQuery);
        setResults(res);
      } catch (err) {
        console.error("❌ Gagal fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  useEffect(() => {
    async function fetchPopularStocks() {
      try {
        const res = await searchStocks();
        setResults(res);
      } catch (err) {
        console.error("❌ Gagal fetch popular stocks:", err);
      }
    }

    if (query.length === 0) {
      fetchPopularStocks();
    }
  }, [query]);

  const handleChange = (value: string) => {
    setQuery(value);
    if (!open) setOpen(true);
  };

  return (
    <>
      {/* 🔎 Input utama */}
      <div className="relative max-w-sm w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search stocks, tickers, or companies..."
          className="pl-9 pr-4 py-2 bg-[#111] border border-slate-700 text-slate-100 placeholder:text-slate-500
                     focus:ring-2 focus:ring-orange-500 focus:border-orange-500 rounded-xl shadow-sm transition-all duration-200 hover:border-slate-600"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setOpen(true)}
        />
      </div>

      {/* ⚡ Command Dialog */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="bg-[#0b0b0b] border border-slate-800 rounded-xl shadow-2xl text-slate-100">
        <div className="relative px-3 py-2 border-b border-slate-800">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Type a stock symbol (e.g. AAPL, TSLA, BTC)..."
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg bg-[#111] text-slate-100 placeholder:text-slate-500 
                       focus:outline-none focus:ring-2 focus:ring-orange-500 border border-slate-700"
          />
        </div>

        <CommandList className="bg-[#0b0b0b] text-slate-100">
          {/* ⏳ Loading */}
          {loading && (
            <CommandGroup heading="Searching...">
              <CommandItem disabled>
                <span className="animate-pulse text-slate-500">
                  Fetching stock data...
                </span>
              </CommandItem>
            </CommandGroup>
          )}

          {/* 📊 Popular Stocks */}
          {!debouncedQuery && !loading && query.length === 0 && (
            <CommandGroup heading="🔥 Popular Stocks">
              {results.slice(0, 10).map((item, index) => (
                <Link key={index} href={`/stocks/${item.symbol}`}>
                  <CommandItem
                    key={index}
                    onSelect={() => setOpen(false)}
                    className="flex justify-between items-center px-3 py-2.5 rounded-md cursor-pointer
                               hover:bg-[#1a1a1a] transition-colors duration-150 border-b border-slate-800">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-slate-100 text-sm">
                          {item.name || "Unknown"}
                        </span>
                        {item.symbol && (
                          <span className="text-[11px] font-semibold px-2 py-[1px] rounded-md bg-orange-500 text-black">
                            {item.symbol}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 ml-6 mt-0.5">
                        {item.exchange || "Unknown Exchange"} •{" "}
                        {item.type || "Stock"}
                      </div>
                    </div>
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          )}

          {/* 💹 Hasil pencarian */}
          <AnimatePresence>
            {debouncedQuery && results.length > 0 && !loading && (
              <CommandGroup heading={`💹 Search Results (${results.length})`}>
                {results.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}>
                    <Link key={index} href={`/stocks/${item.symbol}`}>
                      <CommandItem
                        onSelect={() => setOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer 
                                   bg-[#0b0b0b] hover:bg-[#1a1a1a] transition-colors duration-150 border-b border-slate-800">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="font-medium text-slate-100 text-sm">
                              {item.name || "Unknown"}
                            </span>
                            {item.symbol && (
                              <span className="text-[11px] font-semibold px-2 py-[1px] rounded-md bg-orange-500 text-black">
                                {item.symbol}
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-slate-500 ml-6 mt-0.5">
                            {item.exchange || "Unknown Exchange"} •{" "}
                            {item.type || "Stock"}
                          </div>
                        </div>
                      </CommandItem>
                    </Link>
                  </motion.div>
                ))}
              </CommandGroup>
            )}
          </AnimatePresence>

          {/* 🚫 Tidak ada hasil */}
          {debouncedQuery && results.length === 0 && !loading && (
            <CommandEmpty>
              <span className="text-slate-400">
                No stocks found for{" "}
                <span className="text-orange-500 font-medium">
                  {debouncedQuery}
                </span>
              </span>
            </CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
