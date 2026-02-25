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

      <div className="relative z-10 flex flex-col flex-1 justify-center gap-8">
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-base text-white/50 text-center"
        >
          {data.upcomingFocusDescription.split(".")[0]}.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-center"
        >
          <p className="text-lg text-white/60 mb-2">
            We&apos;re going to shift the focus to your
          </p>
          <p className="text-5xl font-black leading-tight">
            {data.upcomingFocus.toLowerCase()}
          </p>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base text-white/60 text-center leading-relaxed"
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

        {/* Why we picked this — soft theme intro per Rob's feedback */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-4 bg-surface-light/50 rounded-2xl border border-white/5"
        >
          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">
            Why this focus?
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            Based on your recent sessions and progress, we think{" "}
            {data.upcomingFocus.toLowerCase()} work will give you the best
            results right now. This pairs naturally with your previous lower
            body training and keeps you moving toward your goal.
          </p>
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
