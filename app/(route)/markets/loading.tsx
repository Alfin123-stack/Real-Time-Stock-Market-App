export default function Loading() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="border border-slate-800 bg-gradient-to-b from-[#0b0b0b] to-[#0b0b0b]/80 rounded-2xl overflow-hidden shadow-md animate-pulse">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-slate-700 rounded-md" />{" "}
              {/* Icon placeholder */}
              <div className="h-5 w-20 bg-slate-700 rounded" /> {/* Symbol */}
            </div>
            <div className="h-5 w-5 bg-slate-700 rounded-full" />{" "}
            {/* Star icon */}
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 bg-slate-700 rounded" />{" "}
            {/* Stock name */}
            <div className="h-3 w-1/2 bg-slate-800 rounded" />{" "}
            {/* Type + exchange */}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-slate-700 rounded" />{" "}
              {/* Trending icon */}
              <div className="h-3 w-10 bg-slate-800 rounded" /> {/* % */}
            </div>
            <div className="h-3 w-8 bg-slate-800 rounded" /> {/* "Today" */}
          </div>
        </div>
      ))}
    </div>
  );
}
