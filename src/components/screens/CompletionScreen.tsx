"use client";

import { motion } from "framer-motion";
import { CheckpointData } from "@/lib/types";

interface Props {
  data: CheckpointData;
  onRestart: () => void;
}

export default function CompletionScreen({ data, onRestart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col items-center justify-between h-full px-10 pt-12 pb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-accent/5 to-background" />

      <div className="relative z-10 flex flex-col items-center flex-1 justify-center text-center gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-5xl pulse-glow"
        >
          🎯
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold leading-tight"
        >
          You&apos;re all set!
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base text-white/50 leading-relaxed"
        >
          Your plan has been updated. Time to crush your next chapter focused on{" "}
          <span className="text-accent font-semibold">
            {data.upcomingTag.replace("_", " ")}
          </span>
          .
        </motion.p>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col gap-2 mt-4 w-full"
        >
          {data.planItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex items-center justify-between px-4 py-2 bg-white/5 rounded-xl"
            >
              <span className="text-sm text-white/40">{item.label}</span>
              <span className="text-sm font-semibold">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 w-full flex flex-col gap-3">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-full py-4 rounded-2xl bg-accent text-background font-semibold text-base tracking-wide"
        >
          Let&apos;s Go!
        </motion.button>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          onClick={onRestart}
          className="w-full py-3 rounded-2xl bg-white/5 text-white/40 font-medium text-sm"
        >
          Replay Checkpoint
        </motion.button>
      </div>
    </motion.div>
  );
}
