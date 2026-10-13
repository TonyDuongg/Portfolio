import { useEffect, useRef, useState } from "react";
import { profile } from "../data/portfolio";
import { Icon } from "./Icon";

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    timer.current = setTimeout(() => setCopyState("idle"), 4500);
  }
  return (
    <footer
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="contact-main" data-reveal>
          <h2 className="editorial-title" id="contact-heading">
            Have something<em>in mind?</em>
          </h2>
          <div className="contact-copy">
            <p>
              Let’s talk about backend development,
              <br className="desktop-break" /> a project, or a good idea.
            </p>
            <div className="contact-actions">
              <a
                href={`mailto:${profile.email}`}
                className="button button-outline"
              >
                Say hello
                <Icon name="arrow-up-right" />
              </a>
              <button
                className="icon-button copy-button"
                type="button"
                onClick={() => void copyEmail()}
                aria-label={
                  copyState === "copied" ? "Email copied" : "Copy email address"
                }
                title="Copy email address"
              >
                <Icon name={copyState === "copied" ? "check" : "copy"} />
              </button>
            </div>
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <p className="copy-status" role="status">
              {copyState === "copied"
                ? "Email copied. Talk soon!"
                : copyState === "error"
                  ? "Couldn’t copy automatically. You can select the email above."
                  : ""}
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <a className="brand footer-brand" href="#home">
              tonyduong<span>.</span>
            </a>
            <p className="copyright">
              © {new Date().getFullYear()} Nguyễn Hải Dương
            </p>
          </div>
          <nav className="social-links" aria-label="Social links">
            {(["github", "linkedin", "facebook"] as const).map(
              (network, index) => (
                <a
                  key={network}
                  href={profile[network]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {["GitHub", "LinkedIn", "Facebook"][index]}
                  <Icon name="arrow-up-right" />
                  <span className="sr-only"> (opens a new tab)</span>
                </a>
              ),
            )}
          </nav>
          <a className="back-to-top" href="#home">
            Back to top
            <Icon name="arrow-up" />
          </a>
        </div>
      </div>
    </footer>
  );
}
