import { redact } from "agent-redact";
import { describe, expect, it } from "vitest";
import { redactText, sampleLog } from "./redact";

describe("browser redaction port", () => {
  const inputs = [
    sampleLog(),
    "nothing secret here, just a sentence about Spring Boot.",
    "DB_PASSWORD=correct-horse-battery\nemail me: someone@example.org",
    "export GITHUB_TOKEN=ghp_" + "a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8",
    "",
  ];

  it.each(inputs.map((input, index) => [index, input]))(
    "matches the agent-redact engine on sample %i",
    (_index, input) => {
      const ours = redactText(input);
      const real = redact(input);
      expect(ours.text).toBe(real.text);
      expect(ours.total).toBe(real.totalLeaks);
    },
  );

  it("masks every secret in the page's sample log", () => {
    const result = redactText(sampleLog());
    expect(result.total).toBeGreaterThanOrEqual(4);
    expect(result.text).not.toContain("hunter2");
    expect(result.text).not.toContain("tony@example.com");
  });
});
