"use client";

import { motion } from "framer-motion";
import { CheckpointData } from "@/lib/types";

interface Props {
  data: CheckpointData;
  onNext: () => void;
}

export default function LeagueScreen({ data, onNext }: Props) {
  const progressPercentage = Math.max(
    0,
    Math.min(100, ((data.leagueTotalPlayers - data.leagueRank) / data.leagueTotalPlayers) * 100)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col h-full px-10 pt-12 pb-6 overflow-y-auto"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/15 via-background to-background" />

      <div className="relative z-10 flex flex-col flex-1 justify-center gap-8">
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-sm text-white/50 text-center"
        >
          Your league standing this season
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/15 rounded-full border border-blue-400/20 mb-4">
            <span className="text-blue-300 text-sm font-semibold">
              {data.leagueIcon} {data.leagueName}
            </span>
          </div>
          <p className="text-6xl font-black text-accent">
            #{data.leagueRank}
          </p>
          <p className="text-base text-white/50 mt-1">
            out of {data.leagueTotalPlayers.toLocaleString()} players
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-3"
        >
          <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-accent rounded-full"
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">
              Top {Math.round(progressPercentage)}%
            </span>
            <span className="text-white/60 font-medium">
              {data.leaguePointsToNextRank} pts to next rank
            </span>
          </div>
        </motion.div>

        {/* League info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-4 bg-surface-light/50 rounded-xl border border-white/5"
        >
          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">
            How leagues work
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            Compete with players worldwide based on your Move Points. Complete workouts to climb the ranks and unlock exclusive rewards.
          </p>
        </motion.div>
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
        onClick={onNext}
        className="relative z-10 w-12 h-12 ml-auto rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        →
      </motion.button>
    </motion.div>
  );
}
