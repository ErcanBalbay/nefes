export function StreakBadge({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-background-elevated px-4 py-2">
      <span className="text-lg">🔥</span>
      <span className="text-sm font-medium">
        {count > 0 ? `${count} günlük seri` : "Bugün başla"}
      </span>
    </div>
  );
}
