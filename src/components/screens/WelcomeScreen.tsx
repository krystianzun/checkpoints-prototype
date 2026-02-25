"use client";

import { motion } from "framer-motion";
import { CheckpointData } from "@/lib/types";

interface Props {
  data: CheckpointData;
  onNext: () => void;
  section: "celebrate" | "plan";
}

export default function WelcomeScreen({ data, onNext, section }: Props) {
  const isCelebrate = section === "celebrate";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col items-center justify-between h-full px-10 pt-12 pb-8"
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 ${
          isCelebrate
            ? "bg-gradient-to-b from-accent/20 via-background to-background"
            : "bg-gradient-to-b from-blue-500/20 via-background to-background"
        }`}
      />

      <div className="relative z-10 flex flex-col items-center flex-1 justify-center text-center gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
            isCelebrate ? "bg-accent/20" : "bg-blue-500/20"
          }`}
        >
          {isCelebrate ? "🎉" : "🗺️"}
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold leading-tight"
        >
          {isCelebrate
            ? "Let's celebrate\nhow far you've come!"
            : "Now — time to\nplan for the\nroad ahead."}
        </motion.h1>

        {data.persona === "new_user" && !isCelebrate && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20"
          >
            <span className="text-accent text-sm font-semibold">
              ⬆ Plan Upgrade
            </span>
          </motion.div>
        )}
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onNext}
        className={`relative z-10 w-full py-4 rounded-2xl font-semibold text-base tracking-wide ${
          isCelebrate ? "bg-accent text-background" : "bg-white text-background"
        }`}
      >
        {isCelebrate ? "Celebrate!" : "Plan"}
      </motion.button>
    </motion.div>
  );
}
