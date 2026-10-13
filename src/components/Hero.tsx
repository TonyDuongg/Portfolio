import { Icon } from "./Icon";

export function Hero() {
  return (
    <section
      id="home"
      className="hero container"
      aria-labelledby="hero-heading"
    >
      <div className="hero-main">
        <div className="hero-copy">
          <h1 id="hero-heading">
            <em>Thoughtful code.</em>
            <span>Solid foundations.</span>
          </h1>
          <p className="hero-intro">
            Hi, I’m Tony — a Java backend developer studying at FPT University.
            I turn complex ideas into clear APIs and well-structured systems.
          </p>
          <div className="hero-actions">
            <a href="#work" className="button button-primary">
              Explore my work <Icon name="arrow-down-right" />
            </a>
            <a href="#contact" className="text-link accent">
              Let’s talk <Icon name="arrow-up-right" />
            </a>
          </div>
          <p className="hero-stack mono">Java / Spring Boot / SQL</p>
        </div>
        <figure className="portrait">
          <img
            src="./images/avatar.webp"
            width="1024"
            height="1024"
            alt="Tony’s pixel-art avatar: an orange-hoodie developer at a warmly lit desk"
            fetchPriority="high"
          />
          <figcaption>
            <span className="portrait-name">Nguyễn Hải Dương</span>
            <span className="portrait-location">
              <Icon name="pin" />
              Ho Chi Minh City, Vietnam
            </span>
          </figcaption>
        </figure>
      </div>
      <a href="#work" className="hero-foot">
        <span>A little about what I build</span>
        <span>
          Scroll to explore <Icon name="arrow-down" />
        </span>
      </a>
    </section>
  );
}
