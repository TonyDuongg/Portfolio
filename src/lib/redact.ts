import { DEFAULT_PATTERNS } from "agent-redact/patterns";

/*
 * Browser port of agent-redact's default (one-way) redaction pass.
 * The patterns, validators and severities are the published package's own
 * (`agent-redact/patterns`); only the small selection loop is repeated here,
 * because the package's main entry also loads Node-only modules.
 * src/lib/redact.test.ts checks this port against the real engine.
 */

type Pattern = (typeof DEFAULT_PATTERNS)[number] & {
  secretGroup?: number | string;
  validator?: (value: string) => boolean;
  detect?: (text: string) => Iterable<[number, number]>;
};

const SEVERITY_WEIGHT: Record<string, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

interface Candidate {
  pattern: Pattern;
  start: number;
  end: number;
}

export interface Segment {
  text: string;
  /** Set when this segment replaces a secret. */
  kind?: string;
}

export interface RedactResult {
  text: string;
  segments: Segment[];
  total: number;
}

export const patternCount = DEFAULT_PATTERNS.length;

function span(match: RegExpExecArray, pattern: Pattern) {
  let group = pattern.secretGroup;
  if (group === undefined && match.groups?.secret !== undefined)
    group = "secret";
  if (group !== undefined) {
    const value =
      typeof group === "number" ? match[group] : match.groups?.[group];
    const indices =
      typeof group === "number"
        ? match.indices?.[group]
        : match.indices?.groups?.[group];
    if (value && indices)
      return { secret: value, start: indices[0], end: indices[1] };
  }
  return {
    secret: match[0],
    start: match.index,
    end: match.index + match[0].length,
  };
}

export function redactText(text: string): RedactResult {
  const candidates: Candidate[] = [];
  const consider = (
    pattern: Pattern,
    secret: string,
    start: number,
    end: number,
  ) => {
    if (pattern.validator && !pattern.validator(secret)) return;
    candidates.push({ pattern, start, end });
  };

  for (const pattern of DEFAULT_PATTERNS as Pattern[]) {
    if (pattern.detect) {
      const gate = new RegExp(
        pattern.regex.source,
        pattern.regex.flags.replace(/[gy]/g, ""),
      );
      if (!gate.test(text)) continue;
      for (const [start, end] of pattern.detect(text)) {
        if (start >= 0 && end > start && end <= text.length)
          consider(pattern, text.slice(start, end), start, end);
      }
      continue;
    }
    let flags = pattern.regex.flags;
    if (!flags.includes("g")) flags += "g";
    if (!flags.includes("d")) flags += "d";
    const regex = new RegExp(pattern.regex.source, flags);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      if (match[0].length === 0) {
        regex.lastIndex++;
        continue;
      }
      const found = span(match, pattern);
      consider(pattern, found.secret, found.start, found.end);
    }
  }

  candidates.sort(
    (a, b) =>
      (SEVERITY_WEIGHT[b.pattern.severity] ?? 0) -
        (SEVERITY_WEIGHT[a.pattern.severity] ?? 0) ||
      b.end - b.start - (a.end - a.start) ||
      a.start - b.start,
  );
  const covered = new Uint8Array(text.length);
  const accepted = candidates.filter((candidate) => {
    if (covered.subarray(candidate.start, candidate.end).includes(1))
      return false;
    covered.fill(1, candidate.start, candidate.end);
    return true;
  });
  accepted.sort((a, b) => a.start - b.start);

  const segments: Segment[] = [];
  let cursor = 0;
  for (const match of accepted) {
    if (match.start > cursor)
      segments.push({ text: text.slice(cursor, match.start) });
    segments.push({
      text: `[REDACTED_${match.pattern.placeholder}]`,
      kind: match.pattern.name,
    });
    cursor = match.end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor) });

  return {
    text: segments.map((segment) => segment.text).join(""),
    segments,
    total: accepted.length,
  };
}

/*
 * The sample is assembled at runtime so that no credential-shaped literal
 * sits in the repository (secret scanners would rightly complain). Every value
 * below is fake.
 */
export function sampleLog() {
  const filler = "Xk29Qa7Lm4Rt8Vb1Nc6Pz3Hd5Jw0Fs2Gy7Ue9Ko4Ti1";
  const anthropic = ["sk", "ant", "api03", filler + filler.slice(0, 40)].join(
    "-",
  );
  const aws = ["AKIA", "IOSFODNN7", "EXAMPLE"].join("");
  return [
    "2026-11-25 09:14:02 INFO  worker started, queue=script-generation",
    `2026-11-25 09:14:03 DEBUG ANTHROPIC_API_KEY=${anthropic}`,
    `2026-11-25 09:14:03 DEBUG aws key ${aws}`,
    "2026-11-25 09:14:04 WARN  retry: postgres://studio:hunter2@db.internal:5432/scripts",
    "2026-11-25 09:14:05 INFO  job 4812 done, notify tony@example.com",
  ].join("\n");
}
