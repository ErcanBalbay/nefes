import { createClient } from "@/lib/supabase/client";

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

function computeStreak(completedDates: string[]): StreakData {
  if (completedDates.length === 0) return { count: 0, lastCompletedDate: null };

  const uniqueDatesDesc = Array.from(new Set(completedDates)).sort().reverse();
  let count = 1;
  for (let i = 0; i < uniqueDatesDesc.length - 1; i++) {
    if (daysBetween(uniqueDatesDesc[i + 1], uniqueDatesDesc[i]) === 1) {
      count++;
    } else {
      break;
    }
  }

  return { count, lastCompletedDate: uniqueDatesDesc[0] };
}

export async function getStreak(): Promise<StreakData> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { count: 0, lastCompletedDate: null };

  const { data, error } = await supabase
    .from("breathing_sessions")
    .select("completed_at")
    .eq("user_id", userData.user.id);

  if (error || !data) return { count: 0, lastCompletedDate: null };

  const dates = data.map((row) => row.completed_at.slice(0, 10));
  return computeStreak(dates);
}

export async function recordCompletion(techniqueId: string): Promise<StreakData> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { count: 0, lastCompletedDate: null };

  const today = todayKey();
  const { data: existing } = await supabase
    .from("breathing_sessions")
    .select("id")
    .eq("user_id", userData.user.id)
    .gte("completed_at", `${today}T00:00:00.000Z`)
    .lte("completed_at", `${today}T23:59:59.999Z`)
    .limit(1);

  if (!existing || existing.length === 0) {
    await supabase
      .from("breathing_sessions")
      .insert({ user_id: userData.user.id, technique_id: techniqueId });
  }

  return getStreak();
}
