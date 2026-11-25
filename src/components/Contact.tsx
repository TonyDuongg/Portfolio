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

  const [user, domain] = profile.email.split("@");

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="contact-row">
        Get in touch
      </h2>
      <p className="contact-row">
        <a className="email-link" href={`mailto:${profile.email}`}>
          <span>{user}</span>
          <wbr />
          <span>@{domain}</span>
        </a>
      </p>
      <p className="contact-row">
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          github.com/TonyDuongg
          <span className="sr-only"> (opens a new tab)</span>
        </a>
      </p>
      <p className="contact-row">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          linkedin.com/in/tonyduongg
          <span className="sr-only"> (opens a new tab)</span>
        </a>
      </p>
      <p className="contact-row">Ho Chi Minh City, UTC+7</p>
      <div className="contact-row contact-greet">
        <a className="greet-link" href={`mailto:${profile.email}`}>
          Say hello
          <span className="round-button" aria-hidden="true">
            <Icon name="arrow-up-right" />
          </span>
        </a>
        <button
          className="copy-button"
          type="button"
          onClick={() => void copyEmail()}
          aria-label={
            copyState === "copied" ? "Email copied" : "Copy email address"
          }
        >
          <Icon name={copyState === "copied" ? "check" : "copy"} />
          <span aria-hidden="true">
            {copyState === "copied" ? "Copied" : "Copy email"}
          </span>
        </button>
        <p className="copy-status" role="status">
          {copyState === "copied"
            ? "Email copied. Talk soon!"
            : copyState === "error"
              ? "Couldn’t copy automatically. You can select the email above."
              : ""}
        </p>
      </div>
    </section>
  );
}
