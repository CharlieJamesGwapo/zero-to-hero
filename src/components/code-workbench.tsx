"use client";

import { useRef, useState, type ReactNode } from "react";
import { runCode, type RunResult } from "@/lib/browser-runner";
import { explainError, languages, type Language } from "@/lib/playground";
import { toggleProgress, useProgress } from "./progress";

export type VisibleTest = {
  label: string;
  invocation: string;
  expected: string;
};

function highlight(code: string, language: Language): ReactNode[] {
  const pattern =
    language === "html"
      ? /(<!--[^]*?-->|<\/?[A-Za-z][^>]*>|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b\d+(?:\.\d+)?\b)/g
      : /(\/\/[^\n]*|#[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:const|let|var|function|return|if|else|for|while|class|new|import|from|def|print|try|catch|except|async|await|interface|type|public|int|double|void|include|True|False|None|true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b)/g;
  const output: ReactNode[] = [];
  let cursor = 0;
  for (const match of code.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) output.push(code.slice(cursor, index));
    const value = match[0];
    const kind =
      value.startsWith("//") ||
      value.startsWith("#") ||
      value.startsWith("<!--")
        ? "comment"
        : value.startsWith("<")
          ? "tag"
          : /^['"`]/.test(value)
            ? "string"
            : /^\d/.test(value)
              ? "number"
              : "keyword";
    output.push(
      <span className={`code-token-${kind}`} key={`${index}-${value}`}>
        {value}
      </span>,
    );
    cursor = index + value.length;
  }
  if (cursor < code.length) output.push(code.slice(cursor));
  return output;
}

type Props = {
  language: Language;
  starter: string;
  title?: string;
  tests?: VisibleTest[];
  completion?: { kind: "quests" | "exercises"; id: string };
  compact?: boolean;
  solution?: string;
  explanation?: string;
};

export function CodeWorkbench({
  language,
  starter,
  title,
  tests,
  completion,
  compact,
  solution,
  explanation,
}: Props) {
  const [code, setCode] = useState(starter);
  const [state, setState] = useState<
    "idle" | "running" | "success" | "error" | "timeout"
  >("idle");
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [testResults, setTestResults] = useState<
    { label: string; passed: boolean; actual: string }[]
  >([]);
  const [attempted, setAttempted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState(starter);
  const editor = useRef<HTMLTextAreaElement>(null);
  const highlightLayer = useRef<HTMLPreElement>(null);
  const progress = useProgress();
  const complete = completion
    ? progress[completion.kind].includes(completion.id)
    : false;
  const config = languages[language];

  async function execute() {
    if (!config.available) return;
    setAttempted(true);
    setState("running");
    setError("");
    setTestResults([]);
    if (language === "html") {
      setPreview(code);
      setOutput(["Preview updated in the isolated frame."]);
      setState("success");
      return;
    }
    if (tests?.length) {
      const results: { label: string; passed: boolean; actual: string }[] = [];
      for (const test of tests) {
        let result: RunResult;
        try {
          result = await runCode(language, `${code}\n${test.invocation}`);
        } catch (cause) {
          result = { ok: false, output: [], error: String(cause) };
        }
        const actual = result.ok
          ? (result.output.at(-1) ?? result.value ?? "").trim()
          : (result.error ?? "Error");
        results.push({
          label: test.label,
          passed: result.ok && actual === test.expected,
          actual,
        });
        if (result.timedOut) break;
      }
      setTestResults(results);
      const passed =
        results.length === tests.length && results.every((item) => item.passed);
      setOutput([
        `${results.filter((item) => item.passed).length} / ${tests.length} visible tests passed`,
      ]);
      setState(passed ? "success" : "error");
      if (passed && completion && !complete)
        toggleProgress(completion.kind, completion.id);
      return;
    }
    let result: RunResult;
    try {
      result = await runCode(language, code);
    } catch (cause) {
      result = { ok: false, output: [], error: String(cause) };
    }
    setOutput(result.output);
    setError(result.error ?? "");
    setState(result.timedOut ? "timeout" : result.ok ? "success" : "error");
    if (result.ok && completion && !complete)
      toggleProgress(completion.kind, completion.id);
  }

  function insertTab(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      void execute();
      return;
    }
    if (event.key !== "Tab" || event.shiftKey) return;
    event.preventDefault();
    const field = event.currentTarget;
    const next = `${code.slice(0, field.selectionStart)}  ${code.slice(field.selectionEnd)}`;
    const cursor = field.selectionStart + 2;
    setCode(next);
    requestAnimationFrame(() => {
      field.selectionStart = cursor;
      field.selectionEnd = cursor;
    });
  }

  return (
    <div className={`workbench ${compact ? "workbench-compact" : ""}`}>
      <div className="workbench-main">
        <div className="workbench-editor">
          <div className="workbench-bar">
            <span>
              <i /> {title ?? `main.${config.extension}`}
            </span>
            <span>
              {config.name} · {config.runtime}
            </span>
          </div>
          <div className="workbench-input">
            <div className="line-numbers" aria-hidden="true">
              {code.split("\n").map((_, index) => (
                <span key={index}>{index + 1}</span>
              ))}
            </div>
            <div className="code-editor-field">
              <pre ref={highlightLayer} aria-hidden="true">
                <code>
                  {highlight(code, language)}
                  {"\n"}
                </code>
              </pre>
              <textarea
                ref={editor}
                aria-label={`${config.name} code editor`}
                spellCheck={false}
                value={code}
                onChange={(event) => setCode(event.target.value)}
                onKeyDown={insertTab}
                onScroll={(event) => {
                  if (highlightLayer.current) {
                    highlightLayer.current.scrollTop =
                      event.currentTarget.scrollTop;
                    highlightLayer.current.scrollLeft =
                      event.currentTarget.scrollLeft;
                  }
                }}
                rows={Math.max(compact ? 5 : 12, code.split("\n").length + 1)}
              />
            </div>
          </div>
          <div className="workbench-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={() => void execute()}
              disabled={state === "running" || !config.available}
            >
              {state === "running"
                ? "Running…"
                : tests
                  ? "Run tests ↗"
                  : language === "html"
                    ? "Update preview ↗"
                    : "Run code ↗"}
            </button>
            <div>
              <button
                type="button"
                onClick={() => {
                  setCode(starter);
                  setState("idle");
                  setOutput([]);
                  setError("");
                  setTestResults([]);
                  editor.current?.focus();
                }}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(code);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
        <div className="workbench-output" aria-live="polite">
          <div className="workbench-bar">
            <span>
              {language === "html"
                ? "PREVIEW"
                : tests
                  ? "TEST RESULTS"
                  : "OUTPUT"}
            </span>
            <span data-state={state}>
              {state === "idle"
                ? "READY"
                : state === "running"
                  ? "RUNNING"
                  : state === "success"
                    ? "✓ FINISHED"
                    : state === "timeout"
                      ? "TIMED OUT"
                      : "ERROR"}
            </span>
          </div>
          {language === "html" ? (
            <iframe
              title="HTML and CSS preview"
              sandbox=""
              srcDoc={`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:">${preview}`}
            />
          ) : (
            <div className="output-body">
              {state === "idle" ? (
                <p className="output-placeholder">
                  Press Run or ⌘/Ctrl + Enter to see what your code does.
                </p>
              ) : state === "running" ? (
                <p className="output-placeholder">
                  {language === "python"
                    ? "Loading Python in your browser and running the code…"
                    : "Executing in a browser worker…"}
                </p>
              ) : (
                <>
                  <pre>
                    {output.join("\n") ||
                      (state === "success"
                        ? "Finished with no output. Try printing a value."
                        : "")}
                  </pre>
                  {error && (
                    <>
                      <p className="output-error">{error}</p>
                      {explainError(error, language) && (
                        <p className="output-explanation">
                          <strong>What happened?</strong>{" "}
                          {explainError(error, language)}
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          )}
          {testResults.length > 0 && (
            <ol className="test-results">
              {testResults.map((item) => (
                <li key={item.label} data-passed={item.passed}>
                  <span>
                    {item.passed ? "✓" : "×"} {item.label}
                  </span>
                  <small>
                    {item.passed ? "Passed" : `Got: ${item.actual}`}
                  </small>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
      {!config.available && (
        <p className="runtime-note">
          C++ execution is not available in this browser. Copy the code into{" "}
          <code>main.cpp</code>, then run{" "}
          <code>c++ main.cpp -o main && ./main</code> on your computer.
        </p>
      )}
      {complete && (
        <p className="completion-note" role="status">
          ✓ Complete — your progress is saved in this browser.
        </p>
      )}
      {attempted && tests && (
        <p className="runtime-note">
          These learning checks run in your browser and are visible to you.
          Review the failures, revise the code, and run again.
        </p>
      )}
      {attempted && solution && (
        <details className="reference-solution">
          <summary>View reference solution</summary>
          <pre>
            <code>{solution}</code>
          </pre>
          {explanation && <p>{explanation}</p>}
        </details>
      )}
    </div>
  );
}
