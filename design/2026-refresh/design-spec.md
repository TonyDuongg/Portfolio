# Tony Duong — 2026 refresh

## Accepted visual system

References: `hero.png`, `work.png`, `about-contact.png`. These are design concepts,
not screenshots of the finished site. The two generated project covers are editorial
illustrations, not product screenshots. The original pixel avatar is retained.

- Background: ivory `#f7f7f2`; text: forest `#263e33`; accent: rust `#b65032`;
  secondary text `#60665f`; rules `#d3d6cc`. Flat color, no gradient or image tint.
- DM Sans for prose/navigation; Instrument Serif for editorial italics; Lora for
  project titles and the name caption (complete Vietnamese support); Georgia for
  the work section title. System monospace for short technology lists. Fonts local.
- Container: 1280px maximum, 64px desktop gutters, 24px mobile gutters.
- Hero: open 60/40 split, oversized two-line headline, two actions, short stack
  line; original square avatar in a slightly rotated paper frame. No eyebrow.
- Work: open numbered rows, 2.4:1 illustrated cover, project text, underlined
  actions. Three filter buttons. Inline expandable case notes, no modals.
- About: two open columns; compact ruled skills table. Contact: full-width forest
  band, large serif headline, real email action and copy control, social links.
- Icons: custom 24px SVG, currentColor, 1.5–1.7px rounded strokes. Social links
  use text rather than ambiguous logos (accessibility adaptation).
- Motion: 550ms one-shot entrance, 180ms hover/state changes, subtle portrait
  rotation on hover. Respect reduced motion. No continuous distractions.

## Allowed first-viewport copy

tonyduong. / Work / About / Contact / Thoughtful code. / Solid foundations. /
Hi, I’m Tony — a Java backend developer studying at FPT University. I turn complex
ideas into clear APIs and well-structured systems. / Explore my work / Let’s talk /
Java / Spring Boot / SQL / Nguyễn Hải Dương / Ho Chi Minh City, Vietnam /
A little about what I build / Scroll to explore

Intentional factual clarification from concept: “at FPT University” becomes
“studying at FPT University”; university affiliation must not suggest employment.
Use original avatar, including its TONYD lettering, rather than generated likeness.

## Content sources (checked 2026-10-13)

- https://github.com/TonyDuongg — name, university, Java/Spring Boot/Node/React,
  backend/database focus, Docker/AWS/Next.js exploration and public contacts.
- https://github.com/TonyDuongg/Mien_Nam_30_4 — game features and vanilla stack.
- https://github.com/TonyDuongg/TonyDuongg/blob/main/scripts/generate_langs.py —
  language statistics, GraphQL + public REST fallback, SVG generation.
- https://github.com/TonyDuongg/TonyDuongg/blob/main/.github/workflows/profile-updater.yml
  — daily/manual workflow, Python, contribution snake, output branch.
- Local portfolio source — previous content and avatar; new stack describes this
  implementation, not the not-yet-published GitHub deployment.

Do not claim public Spring Boot services, production users, professional years,
performance benchmarks, private repository contents, or proficiency percentages.
Backend is the profile's stated specialization, not a fabricated project.

## Architecture and continuity

React + TypeScript + Vite with Node.js build-time static rendering. Static hosting
compatible with GitHub Pages; no unnecessary Express server or pretend contact API.
App composes Header, Hero, Projects, About, Contact. Typed content lives in data/.
CSS tokens and shared primitives establish one system. Case notes extend existing
rows. Mobile stacks columns; project filters wrap; mobile navigation is collapsible.
Dark mode is an accessible extension of the same geometry. Legacy files are backed
up unchanged; old /projects.html becomes a redirect to the work section.

## Verification ledger

Implementation and browser comparison complete; see `verification.md`.
Native concept dimensions: hero 1586×992; work 1435×1096;
about/contact 1487×1058. Also test 1440×900, 768×1024, and 390×844.
