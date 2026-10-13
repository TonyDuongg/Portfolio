export const profile = {
  name: "Nguyễn Hải Dương",
  email: "nguyenhaiduong052005@gmail.com",
  github: "https://github.com/TonyDuongg",
  linkedin: "https://www.linkedin.com/in/tonyduongg",
  facebook: "https://www.facebook.com/haiduong205",
} as const;

export type Category = "all" | "web" | "automation";
export interface Project {
  id: string;
  number: string;
  title: string;
  category: Exclude<Category, "all">;
  technologies: readonly string[];
  description: string;
  cover: "journey" | "portfolio" | "automation";
  repository: string;
  live?: string;
  notes: { heading: string; text: string }[];
}

export const projects: Project[] = [
  {
    id: "journey",
    number: "01",
    category: "web",
    cover: "journey",
    title: "Tiến Lên — Hành Trình Thống Nhất",
    technologies: ["JavaScript", "CSS", "Canvas"],
    description:
      "A history-inspired web game. Travel through seven landmarks, answer quizzes, and explore the story of reunification.",
    repository: "https://github.com/TonyDuongg/Mien_Nam_30_4",
    live: "https://mien-nam-30-4.vercel.app",
    notes: [
      {
        heading: "The idea",
        text: "An interactive journey from Hanoi to Saigon, created around the April 30 reunification holiday. Each stop connects a historical event to a timed quiz.",
      },
      {
        heading: "Under the hood",
        text: "Vanilla JavaScript manages the journey, lives, and score. CSS animations and Canvas bring the map to life; a customizable prize wheel saves its settings in localStorage.",
      },
      {
        heading: "What to explore",
        text: "Seven historical stops, time-limited questions, a lucky wheel, and optional music through the YouTube IFrame API. No frontend framework is required.",
      },
    ],
  },
  {
    id: "portfolio",
    number: "02",
    category: "web",
    cover: "portfolio",
    title: "Personal portfolio",
    technologies: ["React", "TypeScript", "Vite"],
    description:
      "A small home for my work, rebuilt around readable content, accessibility, and a calmer interface.",
    repository: "https://github.com/TonyDuongg/Portfolio",
    notes: [
      {
        heading: "The rebuild",
        text: "This site started as HTML, CSS, and JavaScript. The new version separates typed project data, reusable React components, and a shared visual system.",
      },
      {
        heading: "Built for people",
        text: "Keyboard-friendly navigation, light and dark themes, reduced-motion support, and layouts that adapt from a small phone to a wide desktop.",
      },
      {
        heading: "Keeping it simple",
        text: "Node.js powers development and static rendering. Vite produces a static site for GitHub Pages: no always-on server and no personal data collected by a contact form.",
      },
    ],
  },
  {
    id: "automation",
    number: "03",
    category: "automation",
    cover: "automation",
    title: "GitHub profile automation",
    technologies: ["Python", "GitHub Actions"],
    description:
      "An automated profile workflow that turns GitHub language data into a custom SVG overview.",
    repository: "https://github.com/TonyDuongg/TonyDuongg",
    notes: [
      {
        heading: "Less manual upkeep",
        text: "A scheduled GitHub Actions workflow refreshes profile assets daily. It can also be triggered manually or after a push to the main branch.",
      },
      {
        heading: "The data pipeline",
        text: "A Python script aggregates repository language data through the GitHub GraphQL API, with a public REST API fallback, then renders an SVG language card.",
      },
      {
        heading: "The output",
        text: "The workflow generates both language statistics and a contribution snake animation, then publishes the SVG assets to an output branch.",
      },
    ],
  },
];

export const filters: { id: Category; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "web", label: "Web" },
  { id: "automation", label: "Automation" },
];

export const toolkit = [
  { label: "Core focus", tools: "Java · Spring Boot · REST APIs · SQL" },
  { label: "Also working with", tools: "Node.js · React · Git · Postman" },
  { label: "Currently exploring", tools: "Docker · AWS · Next.js" },
];

export function filterProjects(category: Category) {
  return projects.filter(
    (project) => category === "all" || project.category === category,
  );
}
