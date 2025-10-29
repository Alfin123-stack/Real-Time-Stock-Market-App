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
        const res = await searchStocks(); // misalnya searchStocks() tanpa argumen -> popular stocks
        setResults(res);
      } catch (err) {
        console.error("❌ Gagal fetch popular stocks:", err);
      }
    }

    console.log("querysdfasdfasdf " + query.length);
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
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search stocks, tickers, or companies..."
          className="pl-9 pr-4 py-2 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 rounded-xl shadow-sm transition-all duration-200 hover:border-gray-400"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setOpen(true)}
        />
      </div>

      {/* ⚡ Command Dialog */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="bg-white border border-gray-300 rounded-xl shadow-2xl">
        <div className="relative px-3 py-2">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Type a stock symbol (e.g. AAPL, TSLA, BTC)..."
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-50 text-gray-900 placeholder:text-gray-500 
               focus:outline-none focus:ring-2 focus:ring-orange-500 border-none shadow-sm"
          />
        </div>

        <CommandList className="bg-white">
          {/* ⏳ Loading */}
          {loading && (
            <CommandGroup heading="Searching...">
              <CommandItem disabled>
                <span className="animate-pulse text-gray-500">
                  Fetching stock data...
                </span>
              </CommandItem>
            </CommandGroup>
          )}

          {/* 📊 Popular Stocks ketika belum ada input */}
          {!debouncedQuery && !loading && query.length === 0 && (
            <CommandGroup heading="🔥 Popular Stocks">
              {results.slice(0, 10).map((item, index) => (
                <Link key={index} href={`/stocks/${item.symbol}`}>
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      console.log("✅ Selected popular stock:", item);
                      setOpen(false);
                    }}
                    className="flex justify-between items-center px-3 py-2.5 rounded-md cursor-pointer
        hover:bg-gray-100 transition-colors duration-150 border-b border-gray-200">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-900 text-sm">
                          {item.name || "Unknown"}
                        </span>
                        {item.symbol && (
                          <span className="text-[11px] font-semibold px-2 py-[1px] rounded-md bg-orange-500 text-white">
                            {item.symbol}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 ml-6 mt-0.5">
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
                        onSelect={() => {
                          console.log("✅ Selected:", item);
                          setOpen(false);
                        }}
                        className="flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer bg-white
                      hover:bg-gray-100 transition-colors duration-150 border-b border-gray-200">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-gray-900 text-sm">
                              {item.name || "Unknown"}
                            </span>
                            {item.symbol && (
                              <span className="text-[11px] font-semibold px-2 py-[1px] rounded-md bg-orange-500 text-white">
                                {item.symbol}
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-gray-600 ml-6 mt-0.5">
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
              <span className="text-gray-600">
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
