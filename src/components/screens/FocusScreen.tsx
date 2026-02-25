"use client";

import { motion } from "framer-motion";
import { CheckpointData } from "@/lib/types";

interface Props {
  data: CheckpointData;
  onNext: () => void;
}

export default function FocusScreen({ data, onNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col h-full px-10 pt-12 pb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-background to-background" />

      <div className="relative z-10 flex flex-col flex-1 justify-center gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className={`self-center px-4 py-2 rounded-full border text-sm font-semibold ${
            data.tagComparison === "different"
              ? "bg-accent/15 text-accent border-accent/20"
              : "bg-blue-400/15 text-blue-300 border-blue-400/20"
          }`}
        >
          {data.tagComparison === "different"
            ? "🔄 New Focus"
            : "💪 Continuing Focus"}
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center leading-tight"
        >
          Your Next Chapter
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base text-white/60 text-center leading-relaxed"
        >
          {data.upcomingFocusDescription}
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="text-center py-4"
        >
          <p className="text-sm text-white/40 uppercase tracking-wider mb-2">
            Focus Area
          </p>
          <p className="text-4xl font-black text-accent">
            {data.upcomingTag.replace("_", " ").toUpperCase()}
          </p>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-white/60 text-center leading-relaxed"
        >
          {data.upcomingGoalConnection}
        </motion.p>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-2"
        >
          <span className="text-sm text-accent font-medium">🎯 Your goal:</span>
          <span className="text-sm font-bold text-white">{data.goal}</span>
        </motion.div>
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
