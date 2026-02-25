"use client";

import { motion } from "framer-motion";
import { CheckpointData } from "@/lib/types";

interface Props {
  data: CheckpointData;
  onNext: () => void;
}

export default function EffortScreen({ data, onNext }: Props) {
  const minDelta = data.totalMinutes - data.previousTotalMinutes;
  const calDelta = data.caloriesBurned - data.previousCaloriesBurned;
  const showDeltas = data.previousTotalMinutes > 0;

  const stats = [
    {
      label: "Workout time",
      value: data.totalMinutes,
      unit: "MINS",
      delta: showDeltas ? `↑ ${minDelta} mins` : null,
      icon: "⏱",
    },
    {
      label: "Mood Points",
      value: data.moodPoints.toLocaleString(),
      unit: "MP",
      delta: null,
      icon: "✨",
    },
    {
      label: "Calories burned",
      value: data.caloriesBurned,
      unit: "CAL",
      delta: showDeltas ? `↑ ${calDelta} cal` : null,
      icon: "🔥",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col h-full px-8 pt-24 pb-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-background to-background" />

      <div className="relative z-10 flex flex-col flex-1 justify-center gap-4">
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-lg text-white/60 text-center"
        >
          All that hard work really adds up!
        </motion.p>

        <div className="flex flex-col gap-4 mt-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="flex items-center gap-4 p-4 bg-surface-light/50 rounded-2xl border border-white/5"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                {stat.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">{stat.value}</span>
                  <span className="text-sm font-semibold text-white/50">{stat.unit}</span>
                </div>
              </div>
              {stat.delta && (
                <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
                  {stat.delta}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {data.percentile <= 10 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20 text-center"
          >
            <p className="text-sm text-yellow-400 font-semibold">
              🏅 Top {data.percentile}% of FitXR users this chapter
            </p>
          </motion.div>
        )}
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onNext}
        className="relative z-10 w-12 h-12 ml-auto rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        →
      </motion.button>
    </motion.div>
  );
}
