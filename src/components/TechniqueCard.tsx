"use client";

import type { Technique } from "@/lib/techniques";

export function TechniqueCard({
  technique,
  isRecommended,
  onSelect,
}: {
  technique: Technique;
  isRecommended: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="flex flex-col gap-2 rounded-2xl border border-border bg-background-elevated p-5 text-left transition-colors hover:border-accent"
    >
      <div className="flex items-center justify-between">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: technique.color }}
        />
        {isRecommended && (
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
            Önerilen
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold">{technique.name}</h3>
      <p className="text-sm text-muted">{technique.description}</p>
    </button>
  );
}
