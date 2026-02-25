"use client";

import { motion } from "framer-motion";
import { CheckpointData } from "@/lib/types";
import { useState } from "react";

interface Props {
  data: CheckpointData;
  onNext: () => void;
}

export default function PlanScreen({ data, onNext }: Props) {
  const [items, setItems] = useState(data.planItems);
  const [editingId, setEditingId] = useState<string | null>(null);

  const options: Record<string, string[]> = {
    length: ["15 mins", "20 mins", "25 mins", "30 mins", "40 mins"],
    intensity: ["Decreasing", "Maintaining", "Increasing"],
    focus: ["Core Body", "Full Body", "Upper Body", "Lower Body", "Cardio"],
  };

  const cycleValue = (id: string) => {
    const opts = options[id];
    if (!opts) return;
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const currentIndex = opts.indexOf(item.value);
        const nextIndex = (currentIndex + 1) % opts.length;
        return { ...item, value: opts[nextIndex] };
      })
    );
    setEditingId(id);
    setTimeout(() => setEditingId(null), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col h-full px-8 pt-24 pb-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-background" />

      <div className="relative z-10 flex flex-col flex-1 justify-center gap-6">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center gap-2"
        >
          <span className="px-3 py-1 bg-white/10 rounded-full text-white text-xs font-semibold uppercase tracking-wider">
            Plan
          </span>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-center"
        >
          Your Plan:
        </motion.h2>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/40 text-center"
        >
          Tap any item to adjust before you start
        </motion.p>

        <div className="flex flex-col gap-3 mt-2">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => item.editable && cycleValue(item.id)}
              disabled={!item.editable}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                editingId === item.id
                  ? "bg-accent/10 border-accent/30"
                  : "bg-surface-light/50 border-white/5 hover:border-white/10"
              } ${item.editable ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-sm">✓</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold">{item.label}</p>
                <p
                  className={`text-xs transition-colors ${
                    editingId === item.id ? "text-accent" : "text-white/50"
                  }`}
                >
                  {item.value}
                </p>
              </div>
              {item.editable && (
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-white/40 text-xs">✎</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onNext}
        className="relative z-10 w-full py-4 rounded-2xl bg-accent text-background font-semibold text-base tracking-wide pulse-glow"
      >
        I&apos;m Ready!
      </motion.button>
    </motion.div>
  );
}
