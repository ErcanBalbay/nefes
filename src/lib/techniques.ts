export type PhaseName = "inhale" | "hold" | "exhale" | "holdAfterExhale";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export type Phase = {
  name: PhaseName;
  seconds: number;
  label: string;
};

export type Technique = {
  id: string;
  name: string;
  description: string;
  phases: Phase[];
  cycles: number;
  recommendedFor: TimeOfDay[];
  color: string;
};

export const techniques: Technique[] = [
  {
    id: "box",
    name: "Box Breathing",
    description: "4-4-4-4 ritmiyle zihni dengeleyen klasik teknik.",
    phases: [
      { name: "inhale", seconds: 4, label: "Nefes Al" },
      { name: "hold", seconds: 4, label: "Tut" },
      { name: "exhale", seconds: 4, label: "Nefes Ver" },
      { name: "holdAfterExhale", seconds: 4, label: "Tut" },
    ],
    cycles: 6,
    recommendedFor: ["afternoon"],
    color: "#7c9eff",
  },
  {
    id: "4-7-8",
    name: "4-7-8 Tekniği",
    description: "Sakinleşmek ve uykuya geçişi kolaylaştırmak için idealdir.",
    phases: [
      { name: "inhale", seconds: 4, label: "Nefes Al" },
      { name: "hold", seconds: 7, label: "Tut" },
      { name: "exhale", seconds: 8, label: "Nefes Ver" },
    ],
    cycles: 5,
    recommendedFor: ["night"],
    color: "#9c7cff",
  },
  {
    id: "wim-hof",
    name: "Wim Hof Nefesi",
    description: "Enerji veren derin nefesler ve ardından uzun bir tutma.",
    phases: [
      { name: "inhale", seconds: 2, label: "Derin Al" },
      { name: "exhale", seconds: 1, label: "Bırak" },
      { name: "holdAfterExhale", seconds: 15, label: "Tut" },
    ],
    cycles: 3,
    recommendedFor: ["morning"],
    color: "#ff8c69",
  },
  {
    id: "diaphragm",
    name: "Diyafram Nefesi",
    description: "Karından alınan yavaş ve derin nefeslerle gevşeme.",
    phases: [
      { name: "inhale", seconds: 4, label: "Karından Al" },
      { name: "exhale", seconds: 6, label: "Yavaşça Ver" },
    ],
    cycles: 6,
    recommendedFor: ["afternoon", "evening"],
    color: "#5ed6c0",
  },
  {
    id: "morning-energy",
    name: "Sabah Enerjisi",
    description: "2-1-4 ritmiyle güne canlı ve uyanık başla.",
    phases: [
      { name: "inhale", seconds: 2, label: "Nefes Al" },
      { name: "hold", seconds: 1, label: "Tut" },
      { name: "exhale", seconds: 4, label: "Nefes Ver" },
    ],
    cycles: 8,
    recommendedFor: ["morning"],
    color: "#ffd166",
  },
  {
    id: "night-calm",
    name: "Gece Sakinleşme",
    description: "4-6 ritmiyle vücudu uykuya hazırlayan yavaş tempo.",
    phases: [
      { name: "inhale", seconds: 4, label: "Nefes Al" },
      { name: "exhale", seconds: 6, label: "Nefes Ver" },
    ],
    cycles: 6,
    recommendedFor: ["evening", "night"],
    color: "#6a7fdb",
  },
];

export function getTechniqueById(id: string): Technique | undefined {
  return techniques.find((t) => t.id === id);
}
