const moments = [
  {
    src: "./images/avatar-portrait.webp",
    alt: "Tony’s pixel-art self-portrait at a warmly lit desk",
    name: "The desk",
    role: "Self-portrait, in pixels",
    text: "Hải Dương means ocean. Most people call me Tony. This is me at my desk, and the yellow letters across this page are taken from it.",
  },
  {
    src: "./images/fpt-hcmc.webp",
    alt: "Architect’s elevation of the FPT University campus in Ho Chi Minh City, terraces planted with trees",
    name: "FPT University",
    role: "Ho Chi Minh City campus",
    text: "I’m studying software development here. Backend is the part I chose to go deep on: Java, Spring Boot, SQL and how services talk to each other.",
  },
  {
    src: "./images/saigon-night.webp",
    alt: "Riders in helmets waiting at a Ho Chi Minh City junction at night",
    name: "Ho Chi Minh City",
    role: "Home, UTC+7",
    text: "When I write code I try to understand the problem first, give each part one job, and leave it easier for the next person to change.",
  },
];

export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <div className="about-pin">
        <h2 id="about-heading">Hải Dương</h2>
      </div>
      <ul className="about-moments">
        {moments.map((moment) => (
          <li key={moment.name} data-reveal>
            <img
              src={moment.src}
              width="800"
              height="1000"
              alt={moment.alt}
              loading="lazy"
              decoding="async"
            />
            <p className="moment-name">{moment.name}</p>
            <p className="moment-role">{moment.role}</p>
            <p className="moment-text">{moment.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
