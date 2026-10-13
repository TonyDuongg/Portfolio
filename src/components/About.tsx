import { toolkit } from "../data/portfolio";

export function About() {
  return (
    <section
      id="about"
      className="about-section container section-space"
      aria-labelledby="about-heading"
      data-reveal
    >
      <div className="about-heading">
        <h2 id="about-heading">
          Curious by nature.<em>Backend by focus.</em>
        </h2>
        <p className="about-note">Always building. Always learning.</p>
      </div>
      <div className="about-copy">
        <p>
          I’m Nguyễn Hải Dương, a software development student at FPT University
          in Ho Chi Minh City. I’m focused on Java, Spring Boot, and the systems
          behind a useful product.
        </p>
        <p>
          My approach is simple: understand the problem, keep responsibilities
          clear, and make the next person’s work easier.
        </p>
        <dl className="toolkit">
          {toolkit.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.tools}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
