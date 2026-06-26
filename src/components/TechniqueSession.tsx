"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Technique } from "@/lib/techniques";
import { useBreathingSession } from "@/hooks/useBreathingSession";
import { useAudio } from "@/hooks/useAudio";
import { BreathingCircle } from "@/components/BreathingCircle";
import { SoundSelector } from "@/components/SoundSelector";

function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 60) return `${totalSeconds} saniye`;
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return s > 0 ? `${m} dk ${s} sn` : `${m} dakika`;
}

const PULSE_DELAYS = [0, 0.4, 0.8];

export function TechniqueSession({
  technique,
  streakCount,
  onClose,
  onComplete,
}: {
  technique: Technique;
  streakCount: number;
  onClose: () => void;
  onComplete: () => void;
}) {
  const session = useBreathingSession(technique, onComplete);
  const audio = useAudio();

  const isPreStart =
    !session.isRunning &&
    !session.isComplete &&
    session.cycle === 1 &&
    session.secondsLeft === technique.phases[0].seconds;

  const totalSeconds = technique.phases.reduce((sum, p) => sum + p.seconds, 0) * technique.cycles;

  // haptic + ses durdur
  useEffect(() => {
    if (session.isComplete) {
      audio.pause();
      navigator.vibrate?.([80, 40, 80]);
    }
  }, [session.isComplete]);

  function handleStart() {
    session.start();
    audio.play();
  }

  function handlePause() {
    session.pause();
    audio.pause();
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="flex w-full flex-col gap-2 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{technique.name}</h2>
            <p className="text-sm text-muted">
              Döngü {session.cycle} / {session.totalCycles}
            </p>
          </div>
          <button
            onClick={() => { audio.pause(); onClose(); }}
            className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
          >
            Kapat
          </button>
        </div>
        <SoundSelector current={audio.sound} onChange={audio.changeSound} />
      </div>

      {/* İçerik */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
        {session.isComplete ? (
          <div className="relative flex flex-col items-center gap-5 text-center">
            {/* pulse rings */}
            {PULSE_DELAYS.map((delay, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-accent/40"
                style={{ width: 180, height: 180, top: "50%", left: "50%", x: "-50%", y: "-50%" }}
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1.6, delay, ease: "easeOut" }}
              />
            ))}

            {/* özet kart */}
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-4xl">🎉</span>
              <h3 className="text-xl font-semibold">Egzersiz tamamlandı</h3>
              <div className="flex gap-6 text-sm text-muted">
                <span>⏱ {formatDuration(totalSeconds)}</span>
                {streakCount > 0 && <span>🔥 {streakCount} günlük seri</span>}
              </div>
              <p className="text-sm text-muted">Kendine zaman ayırdığın için tebrikler.</p>
              <button
                onClick={onClose}
                className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background"
              >
                Anasayfaya dön
              </button>
            </motion.div>
          </div>
        ) : (
          <>
            <BreathingCircle
              phase={session.phase}
              secondsLeft={session.secondsLeft}
              color={technique.color}
            />

            {/* Teknik hikayesi — sadece pre-start'ta gösterilir */}
            <AnimatePresence>
              {isPreStart && (
                <motion.p
                  className="max-w-xs text-center text-sm leading-relaxed text-muted"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {technique.story}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={session.isRunning ? handlePause : handleStart}
              className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-background"
            >
              {session.isRunning
                ? "Duraklat"
                : session.cycle > 1 || session.secondsLeft !== session.phase.seconds
                ? "Devam Et"
                : "Başlat"}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
