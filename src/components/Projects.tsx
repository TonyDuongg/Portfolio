import { useState } from "react";
import {
  filterProjects,
  filters,
  profile,
  type Category,
  type Project,
} from "../data/portfolio";
import { Icon } from "./Icon";

function ProjectCover({ project }: { project: Project }) {
  if (project.cover === "automation")
    return (
      <div className="project-cover automation-cover" aria-hidden="true">
        <span className="code-title">profile.generate()</span>
        <div className="code-body">
          <div>
            <span>// Fetch language data</span>
            <span>// Generate SVG</span>
            <span>// Update profile</span>
            <span className="code-done">
              &gt; Done. <span className="cursor-mark">_</span>
            </span>
          </div>
          <div className="code-tree">
            <span>├─ languages</span>
            <span>├─ charts</span>
            <span>└─ profile.svg</span>
          </div>
        </div>
      </div>
    );
  return (
    <div className="project-cover">
      <img
        src={`./images/${project.cover}-cover.webp`}
        width="1200"
        height="500"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function ProjectRow({
  project,
  expanded,
  onToggle,
}: {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="project" aria-labelledby={`${project.id}-title`}>
      <div className="project-row">
        <span className="project-number mono" aria-hidden="true">
          {project.number}
        </span>
        <ProjectCover project={project} />
        <div className="project-copy">
          <h3 id={`${project.id}-title`}>{project.title}</h3>
          <p className="project-stack mono">
            {project.technologies.join(" / ")}
          </p>
          <p className="project-description">{project.description}</p>
          <div className="project-actions">
            <a
              className="text-link"
              href={project.live ?? project.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.live ? "View project" : "View source"}
              <Icon name="arrow-up-right" />
              <span className="sr-only">
                {" "}
                — {project.title} (opens a new tab)
              </span>
            </a>
            <button
              className="text-link"
              type="button"
              aria-label={`Case notes — ${project.title}`}
              aria-expanded={expanded}
              aria-controls={`${project.id}-notes`}
              onClick={onToggle}
            >
              Case notes
              <Icon name="plus" className={expanded ? "rotate-close" : ""} />
            </button>
          </div>
        </div>
      </div>
      <div className="case-notes" id={`${project.id}-notes`} hidden={!expanded}>
        {project.notes.map((note) => (
          <div key={note.heading}>
            <h4>{note.heading}</h4>
            <p>{note.text}</p>
          </div>
        ))}
        {project.live && (
          <a
            className="text-link case-source"
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the source
            <Icon name="arrow-up-right" />
            <span className="sr-only"> (opens a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const [category, setCategory] = useState<Category>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const visibleProjects = filterProjects(category);
  return (
    <section
      id="work"
      className="work-section container section-space"
      aria-labelledby="work-heading"
      data-reveal
    >
      <div className="section-label">
        Selected work
        <span />
      </div>
      <div className="work-heading-row">
        <div>
          <h2 id="work-heading" className="editorial-title">
            A few things I’ve <em>built.</em>
          </h2>
          <p className="section-intro">
            Public projects, experiments, and the details behind them.
          </p>
        </div>
        <a
          className="text-link repositories-link"
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
        >
          All repositories
          <Icon name="arrow-up-right" />
          <span className="sr-only"> (opens a new tab)</span>
        </a>
      </div>
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={category === filter.id}
            onClick={() => {
              setCategory(filter.id);
              setExpanded(null);
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visibleProjects.length}{" "}
        {visibleProjects.length === 1 ? "project" : "projects"} shown
      </p>
      <div className="project-list">
        {visibleProjects.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            expanded={expanded === project.id}
            onToggle={() =>
              setExpanded(expanded === project.id ? null : project.id)
            }
          />
        ))}
      </div>
    </section>
  );
}
