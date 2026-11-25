import { useEffect, useRef, useState } from "react";
import { profile } from "../data/portfolio";
import { Icon } from "./Icon";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "github.com/TonyDuongg", href: profile.github },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tonyduongg",
    href: profile.linkedin,
  },
  {
    label: "Facebook",
    value: "facebook.com/haiduong205",
    href: profile.facebook,
  },
  { label: "Based in", value: "Ho Chi Minh City, UTC+7" },
];

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
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="contact-intro" data-reveal>
        <h2 id="contact-heading">Get in touch</h2>
        <p className="lead">
          Write to me about a project, a backend problem or anything on this
          page.
        </p>
        <div className="contact-actions">
          <a className="button" href={`mailto:${profile.email}`}>
            Say hello
            <Icon name="arrow-up-right" />
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
        </div>
        <p className="copy-status" role="status">
          {copyState === "copied"
            ? "Email copied. Talk soon!"
            : copyState === "error"
              ? "Couldn’t copy automatically. You can select the email address."
              : ""}
        </p>
      </div>

      <dl className="contact-list" data-reveal>
        {channels.map((channel) => (
          <div key={channel.label}>
            <dt>{channel.label}</dt>
            <dd>
              {channel.href ? (
                <a
                  href={channel.href}
                  {...(channel.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {channel.value}
                  {channel.href.startsWith("http") && (
                    <span className="sr-only"> (opens a new tab)</span>
                  )}
                </a>
              ) : (
                channel.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
