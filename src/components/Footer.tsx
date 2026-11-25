import { credits, profile } from "../data/portfolio";
import { Icon } from "./Icon";
import { PixelName } from "./PixelName";

export function Footer() {
  return (
    <footer className="site-footer">
      <PixelName className="footer-mark" />
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {profile.name} ·{" "}
          <a href={profile.source} target="_blank" rel="noopener noreferrer">
            Source of this site
          </a>
        </p>
        <nav className="footer-links" aria-label="Elsewhere">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub<span className="sr-only"> (opens a new tab)</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn<span className="sr-only"> (opens a new tab)</span>
          </a>
          <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
            Facebook<span className="sr-only"> (opens a new tab)</span>
          </a>
          <a href="#home">
            Back to top
            <Icon name="arrow-up" />
          </a>
        </nav>
      </div>
      <p className="footer-credits">
        Photos:{" "}
        {credits.map((credit, index) => (
          <span key={credit.href}>
            {index > 0 && " · "}
            <a href={credit.href} target="_blank" rel="noopener noreferrer">
              {credit.title}
            </a>{" "}
            by {credit.by}, {credit.licence}
          </span>
        ))}
      </p>
    </footer>
  );
}
