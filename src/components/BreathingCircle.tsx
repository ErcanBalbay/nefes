"use client";

import { motion } from "framer-motion";
import type { Phase } from "@/lib/techniques";

const scaleByPhase: Record<Phase["name"], number> = {
  inhale: 1.4,
  hold: 1.4,
  exhale: 0.85,
  holdAfterExhale: 0.85,
};

export function BreathingCircle({
  phase,
  secondsLeft,
  color,
}: {
  phase: Phase;
  secondsLeft: number;
  color: string;
}) {
  return (
    <div className="relative flex items-center justify-center h-72 w-72">
      <motion.div
        className="absolute rounded-full"
        style={{ backgroundColor: color, opacity: 0.18 }}
        animate={{ scale: scaleByPhase[phase.name] * 1.15 }}
        transition={{ duration: phase.seconds, ease: "easeInOut" }}
        initial={false}
      >
        <div className="h-56 w-56" />
      </motion.div>
      <motion.div
        className="absolute rounded-full flex flex-col items-center justify-center text-center"
        style={{ backgroundColor: color }}
        animate={{ scale: scaleByPhase[phase.name] }}
        transition={{ duration: phase.seconds, ease: "easeInOut" }}
        initial={false}
      >
        <div className="h-44 w-44 flex flex-col items-center justify-center gap-1">
          <span className="text-lg font-medium text-white/90">{phase.label}</span>
          <span className="text-3xl font-semibold text-white">{secondsLeft}</span>
        </div>
      </motion.div>
    </div>
  );
}
