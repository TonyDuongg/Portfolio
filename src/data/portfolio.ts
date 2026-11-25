export const profile = {
  name: "Nguyễn Hải Dương",
  short: "Tony Duong",
  email: "nguyenhaiduong052005@gmail.com",
  github: "https://github.com/TonyDuongg",
  linkedin: "https://www.linkedin.com/in/tonyduongg",
  facebook: "https://www.facebook.com/haiduong205",
  source: "https://github.com/TonyDuongg/Portfolio",
} as const;

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  kind: string;
  summary: string;
  stack: string;
  facts: string;
  href: string;
  links: ProjectLink[];
  picture: "studio" | "redact" | "game" | "profile";
}

/* Public repositories only, checked against github.com/TonyDuongg on 2026-11-25. */
export const projects: Project[] = [
  {
    id: "creator-studio",
    name: "Creator Studio",
    kind: "Backend service and desktop app",
    summary:
      "Reads public TikTok channels, ranks their videos by engagement and writes three-part scripts: a 3-second hook, the body, a call to action. Script jobs go through AWS SQS, and a job that fails lands in a dead-letter queue and refunds its credits.",
    stack: "Java 21, Spring Boot 3, PostgreSQL, Redis, AWS SQS and S3",
    facts: "2026 · v1.1.0 for Windows",
    href: "https://github.com/TonyDuongg/tiktok-content-intelligence",
    links: [
      {
        label: "Source",
        href: "https://github.com/TonyDuongg/tiktok-content-intelligence",
      },
      {
        label: "Release",
        href: "https://github.com/TonyDuongg/tiktok-content-intelligence/releases/latest",
      },
    ],
    picture: "studio",
  },
  {
    id: "agent-redact",
    name: "agent-redact",
    kind: "Open-source library",
    summary:
      "A local firewall for prompts. It finds API keys, database URLs and personal data before text reaches a model, and can swap them for placeholders that are restored in the answer.",
    stack: "TypeScript, Node.js 22, Python, MCP",
    facts: "2026 · 0.5.0 on npm and PyPI",
    href: "https://github.com/TonyDuongg/agent-redact",
    links: [
      { label: "Source", href: "https://github.com/TonyDuongg/agent-redact" },
      { label: "npm", href: "https://www.npmjs.com/package/agent-redact" },
    ],
    picture: "redact",
  },
  {
    id: "tien-len",
    name: "Tiến Lên",
    kind: "Browser game",
    summary:
      "A game for 30 April: drive from Hà Nội to Dinh Độc Lập through seven stops and answer a timed history question at each one. The whole game is hand-written JavaScript and CSS.",
    stack: "JavaScript, CSS, Canvas",
    facts: "2026 · playable on Vercel",
    href: "https://mien-nam-30-4.vercel.app",
    links: [
      { label: "Play", href: "https://mien-nam-30-4.vercel.app" },
      { label: "Source", href: "https://github.com/TonyDuongg/Mien_Nam_30_4" },
    ],
    picture: "game",
  },
  {
    id: "profile",
    name: "Profile updater",
    kind: "Automation",
    summary:
      "The workflow behind my GitHub profile. A Python script pulls my language statistics through the GraphQL API and draws them as an SVG card; a second step redraws the contribution snake, and both land on an output branch.",
    stack: "Python, GitHub Actions, GraphQL",
    facts: "Runs daily at 00:00 UTC and on every push",
    href: "https://github.com/TonyDuongg/TonyDuongg",
    links: [
      { label: "Source", href: "https://github.com/TonyDuongg/TonyDuongg" },
    ],
    picture: "profile",
  },
];

/* Where each tool did real work. Grouped in fours on the page. */
export const stack: { kind: string; tool: string; where: string }[] = [
  { kind: "Language", tool: "Java 21", where: "Creator Studio" },
  { kind: "Framework", tool: "Spring Boot 3", where: "Creator Studio" },
  { kind: "Data", tool: "PostgreSQL, Redis", where: "Creator Studio" },
  { kind: "Queues", tool: "AWS SQS, dead-letter queue", where: "Creator Studio" },
  { kind: "Storage", tool: "Amazon S3, LocalStack", where: "Creator Studio" },
  { kind: "Models", tool: "Gemini, AWS Bedrock", where: "Creator Studio" },
  { kind: "Language", tool: "TypeScript, Node.js", where: "agent-redact" },
  { kind: "Packaging", tool: "npm and PyPI releases", where: "agent-redact" },
  { kind: "Automation", tool: "GitHub Actions, Python", where: "Profile updater" },
  { kind: "Interface", tool: "React, Vite", where: "Creator Studio, this site" },
  { kind: "Browser", tool: "JavaScript, Canvas", where: "Tiến Lên" },
  { kind: "Learning", tool: "Docker in production, Next.js", where: "Next" },
];

/* From top-langs.svg, drawn by the profile workflow on 2026-11-25. */
export const languages: { name: string; share: number }[] = [
  { name: "Java", share: 44.6 },
  { name: "TypeScript", share: 23.5 },
  { name: "JavaScript", share: 21.1 },
  { name: "CSS", share: 5.8 },
  { name: "Other", share: 5.0 },
];

export const credits = [
  {
    title: "FPT University HCMC campus, elevation",
    by: "Thao247",
    licence: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:25934_04_elevation_VTN.jpg",
  },
  {
    title: "Ho Chi Minh City motorbikers",
    by: "Frank McKenna",
    licence: "CC0",
    href: "https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_City_motorbikers_(Unsplash_LhENdA-0yCM).jpg",
  },
];
