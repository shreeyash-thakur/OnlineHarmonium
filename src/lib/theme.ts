// Theme initialization: applies saved/ system theme before React hydrates to
// prevent flash of wrong theme and exposes a tiny helper for manual toggles.
const STORAGE_KEY = "riyaz-theme";

export function themeInitScript(): string {
  return `(() => {
    try {
      const saved = localStorage.getItem("${STORAGE_KEY}");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const mode = saved || (prefersDark ? "dark" : "light");
      if (mode === "light") document.documentElement.classList.add("light");
    } catch {}
  })();`;
}

export function getTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function setTheme(mode: "light" | "dark") {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (mode === "light") root.classList.add("light");
  else root.classList.remove("light");
  try { localStorage.setItem("${STORAGE_KEY}", mode); } catch {}
}