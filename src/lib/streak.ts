const STORAGE_KEY = "nefes-streak";

type StreakData = {
  count: number;
  lastCompletedDate: string | null;
};

function todayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}

export function getStreak(): StreakData {
  if (typeof window === "undefined") return { count: 0, lastCompletedDate: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, lastCompletedDate: null };
    return JSON.parse(raw) as StreakData;
  } catch {
    return { count: 0, lastCompletedDate: null };
  }
}

export function recordCompletion(): StreakData {
  const current = getStreak();
  const today = todayKey();

  if (current.lastCompletedDate === today) {
    return current;
  }

  const isConsecutive =
    current.lastCompletedDate !== null &&
    daysBetween(current.lastCompletedDate, today) === 1;

  const next: StreakData = {
    count: isConsecutive ? current.count + 1 : 1,
    lastCompletedDate: today,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
