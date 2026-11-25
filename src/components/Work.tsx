import { useEffect, useRef, useState, type ReactNode } from "react";
import { projects, type Project } from "../data/portfolio";
import { redactText, sampleLog } from "../lib/redact";
import { Icon } from "./Icon";

const studioSteps = [
  ["Channel ingest", "RapidAPI"],
  ["Raw payload", "Amazon S3"],
  ["Video metrics", "PostgreSQL"],
  ["Script job", "AWS SQS"],
  ["Worker", "Gemini or Bedrock"],
  ["Hook, body, CTA", "saved"],
  ["Failed job", "DLQ, credits back"],
];

/* From .github/workflows/profile-updater.yml in TonyDuongg/TonyDuongg. */
const profileSteps = [
  ["Schedule", "00:00 UTC daily"],
  ["Also runs", "on push, by hand"],
  ["generate_langs.py", "top-langs.svg"],
  ["Platane/snk", "snake SVG"],
  ["Publish", "output branch"],
];

function StepsPanel({
  title,
  steps,
  children,
}: {
  title: string;
  steps: string[][];
  children?: ReactNode;
}) {
  return (
    <div className="ui-panel steps-panel" data-ui>
      <p className="ui-title">{title}</p>
      <ol>
        {steps.map(([step, where]) => (
          <li key={step}>
            <span>{step}</span>
            <span>{where}</span>
          </li>
        ))}
      </ol>
      {children}
    </div>
  );
}

function RedactPanel() {
  const lines = redactText(sampleLog())
    .text.split("\n")
    .map((line) => line.replace(/^\S+ \S+ \S+\s+/, ""));
  return (
    <div className="ui-panel terminal-panel" data-ui>
      <pre>
        <code>
          <span className="prompt">$ cat worker.log | npx agent-redact</span>
          {"\n\n"}
          {lines.join("\n")}
        </code>
      </pre>
    </div>
  );
}

function Picture({ project, decorative }: { project: Project; decorative?: boolean }) {
  switch (project.picture) {
    case "studio":
      return (
        <StepsPanel
          title="Creator Studio · one script request"
          steps={studioSteps}
        />
      );
    case "redact":
      return <RedactPanel />;
    case "game":
      return (
        <img
          src="./images/tien-len.webp"
          width="900"
          height="900"
          alt={
            decorative
              ? ""
              : "Start screen of Tiến Lên: a red flag with a yellow star over the title"
          }
          loading="lazy"
          decoding="async"
        />
      );
    case "profile":
      return (
        <StepsPanel title="profile-updater.yml" steps={profileSteps}>
          <img
            className="snake"
            src="./images/contribution-snake.svg"
            width="880"
            height="192"
            alt={
              decorative
                ? ""
                : "Tony’s GitHub contribution grid with the animated snake eating the year’s commits"
            }
            loading="lazy"
            decoding="async"
          />
        </StepsPanel>
      );
  }
}

export function Work() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  /* While scrolling, the project level with the frame's middle is the active one. */
  useEffect(() => {
    if (!list.current) return;
    const items = Array.from(
      list.current.querySelectorAll<HTMLElement>(".work-item"),
    );
    let tick = 0;
    const pick = () => {
      tick = 0;
      const box = frame.current?.getBoundingClientRect();
      if (!box || box.width === 0) return;
      const middle = box.top + box.height / 2;
      let best = 0;
      let distance = Infinity;
      items.forEach((item, index) => {
        const r = item.getBoundingClientRect();
        const d =
          middle < r.top ? r.top - middle : middle > r.bottom ? middle - r.bottom : 0;
        if (d < distance) {
          distance = d;
          best = index;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!tick) tick = requestAnimationFrame(pick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(tick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="work" className="work" aria-labelledby="work-heading">
      <h2 id="work-heading" className="work-heading" data-reveal>
        Recent work
      </h2>

      <ol className="work-list" ref={list}>
        {projects.map((project, index) => (
          <li
            key={project.id}
            className="work-item"
            data-active={index === active}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <figure className="work-phone-picture" aria-hidden="true">
              <Picture project={project} decorative />
            </figure>
            <div className="work-name-row">
              <h3>
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  {project.name}
                  <span className="sr-only"> (opens a new tab)</span>
                </a>
              </h3>
              <p className="work-kind">{project.kind}</p>
            </div>
            <p className="work-summary">{project.summary}</p>
            <p className="work-meta">
              {project.stack} · {project.facts}
            </p>
            <p className="work-links">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <Icon name="arrow-up-right" />
                  <span className="sr-only">
                    {" "}
                    — {project.name} (opens a new tab)
                  </span>
                </a>
              ))}
            </p>
          </li>
        ))}
      </ol>

      <div className="work-frame" ref={frame}>
        {projects.map((project, index) => (
          <figure
            key={project.id}
            className="work-picture"
            data-active={index === active}
            aria-hidden={index !== active}
          >
            <Picture project={project} />
          </figure>
        ))}
      </div>
    </section>
  );
}
