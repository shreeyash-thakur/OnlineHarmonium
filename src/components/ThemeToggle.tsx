import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { getTheme, setTheme } from "@/lib/theme";

export function ThemeToggle() {
  const [mode, setMode] = useState(getTheme);

  useEffect(() => {
    setTheme(mode);
  }, [mode]);

  return (
    <button
      type="button"
      onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
      className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {mode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}