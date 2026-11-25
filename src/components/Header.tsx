import { useTheme } from "../hooks/useTheme";
import { Icon } from "./Icon";

const links = [
  { href: "#work", label: "Work" },
  { href: "#redact", label: "Try it" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="site-header">
      <nav aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <button
        className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        <Icon name={theme === "dark" ? "sun" : "moon"} />
      </button>
    </header>
  );
}
