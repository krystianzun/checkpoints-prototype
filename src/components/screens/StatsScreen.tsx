"use client";

import { motion } from "framer-motion";
import { CheckpointData } from "@/lib/types";

interface Props {
  data: CheckpointData;
  onNext: () => void;
}

export default function StatsScreen({ data, onNext }: Props) {
  const classDelta = data.classesCompleted - data.previousClassesCompleted;
  const showDelta = data.previousClassesCompleted > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col h-full px-10 pt-12 pb-8"
    >
      <div className="absolute inset-0 bg-linear-to-b from-accent/10 via-background to-background" />

      <div className="relative z-10 flex flex-col flex-1 justify-center gap-6">
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-sm text-white/50"
        >
          Since the last checkpoint...
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-center py-8"
        >
          <p className="text-lg text-white/60 mb-2">You completed</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-7xl font-black">{data.classesCompleted}</span>
          </div>
          <p className="text-2xl font-bold mt-1">CLASSES</p>

          {showDelta && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/15 rounded-full"
            >
              <span className="text-accent text-sm font-semibold">
                ↑ {classDelta} more than last chapter
              </span>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-surface-light/50 rounded-2xl border border-white/5"
        >
          <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
            Highlight
          </p>
          <p className="text-sm font-semibold text-accent">
            {data.highlightDate}
          </p>
          <p className="text-sm text-white/70 mt-1">
            {data.highlightDescription}
          </p>
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
