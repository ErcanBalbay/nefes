"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { techniques, type Technique } from "@/lib/techniques";
import { getGreeting, getTimeOfDay } from "@/lib/timeOfDay";
import { getStreak, recordCompletion } from "@/lib/streak";
import { GreetingBanner } from "@/components/GreetingBanner";
import { StreakBadge } from "@/components/StreakBadge";
import { TechniqueCard } from "@/components/TechniqueCard";
import { TechniqueSession } from "@/components/TechniqueSession";

export default function Home() {
  const [streakCount, setStreakCount] = useState(() => getStreak().count);
  const [activeTechnique, setActiveTechnique] = useState<Technique | null>(null);
  const [timeOfDay] = useState<ReturnType<typeof getTimeOfDay>>(() => getTimeOfDay());

  const recommended =
    techniques.find((t) => t.recommendedFor.includes(timeOfDay)) ?? techniques[0];

  return (
    <div className="flex flex-1 flex-col gap-8 px-6 py-10 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between gap-4">
        <GreetingBanner greeting={getGreeting(timeOfDay)} recommendedTechnique={recommended} />
        <StreakBadge count={streakCount} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {techniques.map((technique) => (
          <TechniqueCard
            key={technique.id}
            technique={technique}
            isRecommended={technique.id === recommended.id}
            onSelect={() => setActiveTechnique(technique)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeTechnique && (
          <TechniqueSession
            technique={activeTechnique}
            onClose={() => setActiveTechnique(null)}
            onComplete={() => setStreakCount(recordCompletion().count)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
