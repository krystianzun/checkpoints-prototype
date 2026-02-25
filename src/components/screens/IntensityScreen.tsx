"use client";

import { motion } from "framer-motion";
import { CheckpointData } from "@/lib/types";

interface Props {
  data: CheckpointData;
  onNext: () => void;
}

export default function IntensityScreen({ data, onNext }: Props) {
  const directionConfig = {
    lower: {
      icon: "🧘",
      badge: "Recalibrating",
      badgeColor: "bg-blue-400/15 text-blue-300 border-blue-400/20",
      barColor: "bg-blue-400",
      barWidth: "35%",
      prevWidth: "55%",
    },
    maintain: {
      icon: "⚡",
      badge: "Holding Steady",
      badgeColor: "bg-yellow-400/15 text-yellow-300 border-yellow-400/20",
      barColor: "bg-yellow-400",
      barWidth: "55%",
      prevWidth: "55%",
    },
    increase: {
      icon: "🚀",
      badge: "Plan Upgrade",
      badgeColor: "bg-accent/15 text-accent border-accent/20",
      barColor: "bg-accent",
      barWidth: "75%",
      prevWidth: "55%",
    },
  };

  const config = directionConfig[data.intensityDirection];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col h-full px-10 pt-12 pb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-background to-background" />

      <div className="relative z-10 flex flex-col flex-1 justify-center gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className={`self-center px-4 py-2 rounded-full border text-sm font-semibold ${config.badgeColor}`}
        >
          {config.icon} {config.badge}
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center leading-tight"
        >
          {data.intensityCopy}
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-2xl font-bold">
            Let&apos;s{" "}
            <span className="text-accent">
              {data.intensityDirection === "increase"
                ? "increase"
                : data.intensityDirection === "maintain"
                  ? "maintain"
                  : "recalibrate"}{" "}
            </span>
            your intensity.
          </p>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base text-white/60 text-center leading-relaxed"
        >
          {data.intensityReason}
        </motion.p>

        {/* Intensity bar visualization */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 p-5 bg-surface-light/50 rounded-2xl border border-white/5"
        >
          <div className="flex justify-between text-xs text-white/40 mb-3">
            <span>Intensity Level</span>
            <span className="text-accent font-semibold">
              {data.intensityDirection === "increase"
                ? "↑ Going up"
                : data.intensityDirection === "maintain"
                  ? "→ Steady"
                  : "↓ Easing in"}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/30 w-12">Before</span>
              <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: config.prevWidth }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="h-full bg-white/20 rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/30 w-12">Next</span>
              <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: config.barWidth }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className={`h-full ${config.barColor} rounded-full`}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={onNext}
        className="relative z-10 w-12 h-12 ml-auto rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        →
      </motion.button>
    </motion.div>
  );
}
