"use client";

import type { Technique } from "@/lib/techniques";

export function TechniqueCard({
  technique,
  isRecommended,
  isFavorite,
  onSelect,
  onToggleFavorite,
}: {
  technique: Technique;
  isRecommended: boolean;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
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
        <div className="flex items-center gap-2">
          {isRecommended && (
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
              Önerilen
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`text-base leading-none transition-colors ${
              isFavorite ? "text-red-400" : "text-muted hover:text-foreground"
            }`}
            aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
      <h3 className="text-base font-semibold">{technique.name}</h3>
      <p className="text-sm text-muted">{technique.description}</p>
    </button>
  );
}
