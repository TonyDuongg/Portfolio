import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

/* Dark (the lit room of the avatar) is the default; light is the yellow of its lettering. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
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
