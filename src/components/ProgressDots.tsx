"use client";

interface ProgressDotsProps {
  total: number;
  current: number;
  onSkip: () => void;
}

export default function ProgressDots({
  total,
  current,
  onSkip,
}: ProgressDotsProps) {
  return (
    <div className="absolute top-4 left-0 right-0 z-40 flex items-center justify-between px-6">
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i < current
                ? "w-6 bg-accent"
                : i === current
                  ? "w-6 bg-white"
                  : "w-3 bg-white/20"
            }`}
          />
        ))}
      </div>
      <button
        onClick={onSkip}
        className="text-xs text-white/50 hover:text-white/80 transition-colors font-medium tracking-wide uppercase"
      >
        Skip
      </button>
    </div>
  );
}
