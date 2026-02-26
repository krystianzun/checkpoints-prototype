"use client";

import { motion } from "framer-motion";
import { CheckpointData } from "@/lib/types";

interface Props {
  data: CheckpointData;
  onNext: () => void;
}

export default function StreakScreen({ data, onNext }: Props) {
  const activeDays = data.streakDays.filter((d) => d === 1).length;
  const totalDays = data.streakDays.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col h-full px-10 pt-12 pb-6 overflow-y-auto"
    >
      <div className="absolute inset-0 bg-linear-to-b from-purple-500/15 via-background to-background" />

      <div className="relative z-10 flex flex-col flex-1 justify-center gap-8">
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-sm text-white/50 text-center"
        >
          Here&apos;s proof you&apos;ve been showing up
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/15 rounded-full border border-purple-400/20 mb-4">
            <span className="text-purple-300 text-sm font-semibold">
              🔥 {data.streakWeeks} Week Streak
            </span>
          </div>
          <p className="text-5xl font-black">
            {activeDays}/{totalDays}
          </p>
          <p className="text-base text-white/50 mt-1">days active</p>
        </motion.div>

        {/* Streak calendar grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-7 gap-2"
        >
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div
              key={`label-${i}`}
              className="text-center text-[10px] text-white/30 font-medium"
            >
              {day}
            </div>
          ))}
          {data.streakDays.map((active, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.03 }}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${
                active
                  ? "bg-accent/80 text-background"
                  : "bg-white/5 text-white/20"
              }`}
            >
              {active ? "✓" : "·"}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onNext}
        className="relative z-10 w-12 h-12 ml-auto rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        →
      </motion.button>
    </motion.div>
  );
}
