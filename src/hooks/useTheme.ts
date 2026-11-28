import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

/* Light paper is the default; dark is a soft charcoal for people who prefer it. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    );
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("tonyd-theme", next);
    } catch {
      /* Storage is optional. */
    }
  }
  return { theme, toggleTheme };
}
