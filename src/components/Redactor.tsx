import { useId, useMemo, useState } from "react";
import { patternCount, redactText, sampleLog } from "../lib/redact";

export function Redactor() {
  const [input, setInput] = useState(sampleLog);
  const result = useMemo(() => redactText(input), [input]);
  const inputId = useId();

  return (
    <section id="redact" className="redact" aria-labelledby="redact-heading">
      <div className="redact-head" data-reveal>
        <h2 id="redact-heading">Paste a log. Keep your keys.</h2>
        <p className="lead">
          agent-redact checks text for secrets before it reaches a model. This
          box runs the package’s {patternCount} patterns in your browser, so
          nothing you paste leaves this page.
        </p>
      </div>

      <div className="redact-desk" data-reveal>
        <div className="redact-in">
          <label htmlFor={inputId}>Your text</label>
          <textarea
            id={inputId}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            autoComplete="off"
            maxLength={20000}
            rows={9}
          />
          <p className="redact-actions">
            <button type="button" onClick={() => setInput(sampleLog())}>
              Reset the sample
            </button>
            <button type="button" onClick={() => setInput("")}>
              Clear
            </button>
          </p>
        </div>
        <div className="redact-out">
          <p className="redact-label" id={`${inputId}-out`}>
            What the model receives
          </p>
          <pre aria-labelledby={`${inputId}-out`} tabIndex={0}>
            <code>
              {result.segments.length === 0
                ? " "
                : result.segments.map((segment, index) =>
                    segment.kind ? (
                      <mark key={index} title={segment.kind}>
                        {segment.text}
                      </mark>
                    ) : (
                      <span key={index}>{segment.text}</span>
                    ),
                  )}
            </code>
          </pre>
          <p className="redact-count" role="status">
            {result.total === 0
              ? "Nothing to mask."
              : `${result.total} ${result.total === 1 ? "secret" : "secrets"} masked.`}
          </p>
        </div>
      </div>

      <dl className="redact-facts" data-reveal>
        <div>
          <dt>Install</dt>
          <dd>
            <code>npm install agent-redact</code>
            <code>pip install agent-redact</code>
          </dd>
        </div>
        <div>
          <dt>Used</dt>
          <dd>2,302 npm downloads in the 30 days to 24 November 2026</dd>
        </div>
        <div>
          <dt>Read</dt>
          <dd>
            <a
              href="https://github.com/TonyDuongg/agent-redact"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source and docs on GitHub
              <span className="sr-only"> (opens a new tab)</span>
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
