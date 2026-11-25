import { profile } from "../data/portfolio";
import { Icon } from "./Icon";
import { PixelName } from "./PixelName";

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="hero-intro" data-reveal>
        <p className="lead">
          Nguyễn Hải Dương. I build backends in Java and Spring Boot.
        </p>
        <a className="button" href="#work">
          See the work
          <Icon name="arrow-down" />
        </a>
      </div>

      <h1 id="hero-heading" className="monument">
        <span className="sr-only">Tony Duong, Java backend developer</span>
        <PixelName withAvatar className="monument-mark" />
      </h1>

      <img
        className="hero-phone-portrait"
        src="./images/avatar-portrait.webp"
        width="800"
        height="1000"
        alt="Tony’s pixel-art self-portrait: orange hoodie, a desk, a monitor full of code"
      />

      <div className="hero-foot">
        <p>Ho Chi Minh City · studying at FPT University</p>
        <p className="hero-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </p>
      </div>
    </section>
  );
}
