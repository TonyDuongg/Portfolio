# Verification — 2026-10-13

## Build and functionality

- `npm.cmd run check`: PASS — 9 Vitest component/unit tests, strict TypeScript,
  Vite client + server builds, and Node prerender.
- `git diff --check`: PASS. Git's LF/CRLF notices are configuration notices, not
  whitespace errors.
- Production preview: `http://127.0.0.1:4173/`. No runtime/hydration errors or
  failed requests in the final tested flow. No console errors in the final session.
- 27 browser assertions passed using Playwright CLI with locally installed Chrome
  (Chromium engine). The Browser/IAB entry point was tried first and returned
  `Browser is not available: iab`. A separate Chromium download was unnecessary.
- Viewports: 320×812, 390×844, 768×1024, 1024×768, 1440×900, 1586×992.
  No horizontal overflow at any width; expanded mobile case notes also fit.
- Web → two projects; Automation → one; All → three. Case notes open/close.
- Mobile menu opens, closes on navigation/Escape, and returns focus on Escape.
- Theme persists through reload. Copy email reports actual clipboard success;
  unit tests separately cover a rejected clipboard and the usable fallback.
- All three images load. Real `mailto:` action retained (no email was sent).
- Old `/projects.html` redirects to `/#work`.
- In a separate browser context with JavaScript disabled, the prerendered H1 and
  three project articles are present. Static content is not hidden by reveal CSS.
- Reduced motion disables smooth scroll. Normal mode has a 550ms reveal transition;
  the pending class is removed as a section enters the viewport.

## Visual comparison / fidelity ledger

Accepted concepts: `hero.png`, `work.png`, `about-contact.png` in this directory.
The concepts and the latest production screenshots were opened with `view_image`
in the same review pass, not assessed only from DOM or build output.
Hero checked at native 1586×992; work viewport at native 1435×1096 with a full
section capture; about/contact viewport at native 1487×1058. The sticky navigation
occupies part of downstream viewports, so the footer continues below the fold.
Mobile and tablet captures were also inspected. Mid-scroll draft captures were
replaced with settled captures before review. Temporary captures/logs are removed
from the working tree after inspection.

| Comparison | Evidence and repair |
| --- | --- |
| First viewport composition | Preserved open two-column text/avatar structure, two-line heading, two actions, stack line and bottom scroll rail. Fixed the original 1024px HTML image height overriding the square frame. |
| Typography | Serif-italic hero paired with strong sans heading. Increased the heading weight and CTA size after the first render. Added Lora's Vietnamese subset after browser review exposed incorrect fallback glyph placement in project titles. |
| Palette | Flat ivory `#f7f7f2`, forest `#263e33`, rust accents; no decorative gradients, glow or color overlay on the avatar. Light and dark states checked. |
| Image treatment | Original pixel avatar in a thin, rotated paper frame; two matching illustrated project covers converted to WebP. No fake product screenshots. |
| Work layout | Numbered editorial rows, landscape media, visible stack and underlined actions. No added bento or nested card grid. Filters and expandable notes verified. |
| About/contact | Open two-column about area, ruled skill rows and forest contact band. Increased body and toolkit sizes after comparison to improve reading. |
| Icons and controls | Consistent thin SVG arrows, theme, disclosure and copy symbols; no Unicode arrow substitutions. Touch controls and visible focus styles checked. |
| Responsive behavior | Mobile stacks content, preserves image ratios and wraps long Vietnamese titles naturally. Tablet retains the two-column composition. No clipped primary content. |

The implementation was faithfully verified against the accepted design system.
No unresolved material layout, interaction, or asset defects were found in the
tested viewports. This is not a claim of pixel-identical reproduction; the explicit
adaptations below preserve factual accuracy, original identity and readability.

### Copy diff

The complete hero text was checked against the allowed copy in `design-spec.md`:
PASS, no unexpected copy added or required copy missing. Navigation and CTA labels
also match. The single factual wording adjustment is `studying at FPT University`
instead of `at FPT University`, avoiding an implication of university employment.

### Intentional adaptations

- Original avatar retained (including its TONYD lettering) instead of Image Gen's
  altered avatar. Generated cover illustrations are not presented as live UI.
- Real web fonts replace the concept's rendered lettering; Lora provides reliable
  Vietnamese diacritics. The name caption is serif instead of system monospace.
- Social links are explicit text links instead of small logo-only controls. The
  clipboard action uses a copy icon rather than the concept's envelope.
- Sticky navigation, inline notes, dark theme and mobile stacking extend the
  original concept within the same layout system. Responsive line breaks and
  section heights follow real content rather than a flat screenshot.

## Preservation and deployment

The dirty HTML/CSS/JS source was copied to `legacy/` before replacement. Original
root `scripts.js` and `style.css` still match those backups by SHA-256; existing
media, untracked assets and previous concepts were not removed or overwritten.

No commit, push, Pages setting change or production deployment was performed.
The supplied workflow needs the repo's Pages source set to GitHub Actions.
The frontend does not pretend to expose a Java/Express service: Node powers
development and static rendering; GitHub profile facts supply the Java identity.
