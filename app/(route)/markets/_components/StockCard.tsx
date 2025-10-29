"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCandlestick, Star, StarOff, TrendingUp } from "lucide-react";
import { StockItem } from "../page";

interface StockCardProps {
  stock: StockItem;
  index: number;
}

export default function StockCard({ stock, index }: StockCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}>
      <Link href={`/stocks/${stock.symbol}`} className="group">
        <Card className="border border-slate-800 bg-gradient-to-b from-[#0b0b0b] to-[#0b0b0b]/80 hover:border-orange-500/80 transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer shadow-md group-hover:shadow-orange-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
              <ChartCandlestick />
              {stock.symbol}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-yellow-500"
              onClick={(e) => e.preventDefault()}>
              {stock.isInWatchlist ? (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
              ) : (
                <StarOff className="h-4 w-4 text-slate-400 group-hover:text-yellow-500 transition" />
              )}
            </Button>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-slate-300 line-clamp-1">{stock.name}</p>
            <p className="text-xs text-slate-500 mt-1">
              {stock.type} — {stock.exchange}
            </p>
          </CardContent>

          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>+{(Math.random() * 3).toFixed(2)}%</span>
            </div>
            <span className="text-slate-500">Today</span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
