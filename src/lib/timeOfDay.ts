import type { TimeOfDay } from "./techniques";

export function getTimeOfDay(date: Date = new Date()): TimeOfDay {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 22) return "evening";
  return "night";
}

const greetings: Record<TimeOfDay, string> = {
  morning: "Günaydın",
  afternoon: "İyi günler",
  evening: "İyi akşamlar",
  night: "İyi geceler",
};

export function getGreeting(timeOfDay: TimeOfDay): string {
  return greetings[timeOfDay];
}
