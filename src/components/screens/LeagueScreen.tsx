"use client";

import { motion } from "framer-motion";
import { CheckpointData } from "@/lib/types";

interface Props {
  data: CheckpointData;
  onNext: () => void;
}

export default function LeagueScreen({ data, onNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col h-full px-10 pt-12 pb-6 overflow-y-auto"
    >
      <div className="absolute inset-0 bg-linear-to-b from-blue-500/15 via-background to-background" />

      <div className="relative z-10 flex flex-col flex-1 justify-center gap-6">
        {/* League card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="relative bg-linear-to-br from-blue-500/30 to-blue-600/20 rounded-2xl p-6 border border-blue-400/30 overflow-hidden"
        >
          <div className="absolute top-0 right-0 text-6xl opacity-20">
            {data.leagueIcon}
          </div>
          <div className="relative z-10">
            <p className="text-2xl font-black text-white uppercase tracking-wide">
              {data.leagueName.replace(" League", "")}
            </p>
            <p className="text-3xl font-black text-white uppercase">LEAGUE</p>
            <p className="text-sm text-white/60 mt-2">
              Your position {data.leagueRank}/{data.leagueTotalPlayers}
            </p>
          </div>
        </motion.div>

        {/* Leaderboard preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-2"
        >
          {/* Top 2 players (mock data) */}
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <span className="text-lg">🥇</span>
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-purple-500" />
            <div className="flex-1">
              <p className="text-sm font-semibold">player_top1</p>
              <p className="text-xs text-white/40">32,450 MP</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <span className="text-lg">🥈</span>
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-semibold">player_top2</p>
              <p className="text-xs text-white/40">29,880 MP</p>
            </div>
          </div>

          {/* Current user */}
          <div className="flex items-center gap-3 p-3 bg-accent/20 rounded-xl border border-accent/30">
            <span className="text-lg">🏅</span>
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-orange-500" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-accent">You</p>
              <p className="text-xs text-white/60">
                {data.movePoints.toLocaleString()} MP
              </p>
            </div>
          </div>
        </motion.div>

        {/* Motivational copy */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          {data.leagueRankChange > 0 && (
            <p className="text-sm text-green-400 mt-3">
              ↑ You climbed {data.leagueRankChange} places this chapter!
            </p>
          )}
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
