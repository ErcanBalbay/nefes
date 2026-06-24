"use client";

import { motion } from "framer-motion";
import type { Technique } from "@/lib/techniques";
import { useBreathingSession } from "@/hooks/useBreathingSession";
import { BreathingCircle } from "@/components/BreathingCircle";

export function TechniqueSession({
  technique,
  onClose,
  onComplete,
}: {
  technique: Technique;
  onClose: () => void;
  onComplete: () => void;
}) {
  const session = useBreathingSession(technique, onComplete);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex w-full items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold">{technique.name}</h2>
          <p className="text-sm text-muted">
            Döngü {session.cycle} / {session.totalCycles}
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
        >
          Kapat
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6">
        {session.isComplete ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-4xl">🎉</span>
            <h3 className="text-xl font-semibold">Egzersiz tamamlandı</h3>
            <p className="text-muted">Kendine zaman ayırdığın için tebrikler.</p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background"
            >
              Anasayfaya dön
            </button>
          </div>
        ) : (
          <>
            <BreathingCircle phase={session.phase} secondsLeft={session.secondsLeft} color={technique.color} />
            <button
              onClick={session.isRunning ? session.pause : session.start}
              className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-background"
            >
              {session.isRunning ? "Duraklat" : session.cycle > 1 || session.secondsLeft !== session.phase.seconds ? "Devam Et" : "Başlat"}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
