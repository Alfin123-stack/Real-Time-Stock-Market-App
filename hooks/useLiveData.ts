import { formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";

type Point = { t: string; v: number };
/* ---------- mock streaming data (simulasi) ---------- */
export function useLiveData(points = 20, intervalMs = 2000) {
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
