"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Technique } from "@/lib/techniques";

type SessionState = {
  phaseIndex: number;
  secondsLeft: number;
  cycle: number;
  isRunning: boolean;
  isComplete: boolean;
};

export function useBreathingSession(technique: Technique, onComplete: () => void) {
  const [state, setState] = useState<SessionState>({
    phaseIndex: 0,
    secondsLeft: technique.phases[0].seconds,
    cycle: 1,
    isRunning: false,
    isComplete: false,
  });
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!state.isRunning || state.isComplete) return;

    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.secondsLeft > 1) {
          return { ...prev, secondsLeft: prev.secondsLeft - 1 };
        }

        const nextPhaseIndex = prev.phaseIndex + 1;

        if (nextPhaseIndex < technique.phases.length) {
          return {
            ...prev,
            phaseIndex: nextPhaseIndex,
            secondsLeft: technique.phases[nextPhaseIndex].seconds,
          };
        }

        const nextCycle = prev.cycle + 1;
        if (nextCycle > technique.cycles) {
          onCompleteRef.current();
          return { ...prev, isRunning: false, isComplete: true };
        }

        return {
          ...prev,
          phaseIndex: 0,
          secondsLeft: technique.phases[0].seconds,
          cycle: nextCycle,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, state.isComplete, technique]);

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    setState({
      phaseIndex: 0,
      secondsLeft: technique.phases[0].seconds,
      cycle: 1,
      isRunning: false,
      isComplete: false,
    });
  }, [technique]);

  return {
    phase: technique.phases[state.phaseIndex],
    secondsLeft: state.secondsLeft,
    cycle: state.cycle,
    totalCycles: technique.cycles,
    isRunning: state.isRunning,
    isComplete: state.isComplete,
    start,
    pause,
    reset,
  };
}
