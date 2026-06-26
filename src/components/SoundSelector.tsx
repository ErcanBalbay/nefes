"use client";

import type { SoundKey } from "@/hooks/useAudio";

const OPTIONS: { key: SoundKey; label: string }[] = [
  { key: "none", label: "Sessiz" },
  { key: "rain", label: "Yağmur" },
  { key: "forest", label: "Orman" },
  { key: "ocean", label: "Okyanus" },
];

type Props = {
  current: SoundKey;
  onChange: (key: SoundKey) => void;
};

export function SoundSelector({ current, onChange }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      {OPTIONS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            current === key
              ? "bg-accent/20 text-accent"
              : "text-muted hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
