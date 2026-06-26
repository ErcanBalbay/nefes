"use client";

import type { Theme } from "@/hooks/useTheme";

const OPTIONS: { key: Theme; label: string }[] = [
  { key: "dark", label: "🌙 Koyu" },
  { key: "light", label: "☀️ Açık" },
  { key: "system", label: "💻 Sistem" },
];

type Props = {
  current: Theme;
  onChange: (t: Theme) => void;
};

export function ThemeSelector({ current, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
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
