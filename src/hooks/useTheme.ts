import { useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";

const STORAGE_KEY = "nefes_theme";

function loadPreference(): Theme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem(STORAGE_KEY) as Theme) ?? "system";
}

function applyTheme(t: Theme) {
  const isDark =
    t === "dark" ||
    (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(loadPreference);

  // sistem teması değişince güncelle
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  function changeTheme(t: Theme) {
    localStorage.setItem(STORAGE_KEY, t);
    setTheme(t);
    applyTheme(t);
  }

  return { theme, changeTheme };
}
