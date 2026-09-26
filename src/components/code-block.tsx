"use client";

import { isValidElement, useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";

export function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
  const pre = useRef<HTMLPreElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<"Copy" | "Copied" | "Unavailable">(
    "Copy",
  );
  const className = isValidElement<{ className?: string }>(children)
    ? children.props.className
    : undefined;
  const language = className?.match(/language-([\w-]+)/)?.[1] ?? "text";

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(pre.current?.innerText ?? "");
      setStatus("Copied");
    } catch {
      setStatus("Unavailable");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("Copy"), 1800);
  }

  return (
    <div className="code-block">
      <div className="code-block-toolbar">
        <span>{language}</span>
        <button type="button" onClick={copy} aria-live="polite">
          {status === "Copied" ? "✓ Copied" : status}
        </button>
      </div>
      <pre ref={pre} {...props}>
        {children}
      </pre>
    </div>
  );
}

export function Terminal({ commands }: { commands: string[] }) {
  return (
    <div className="lesson-terminal" aria-label="Terminal commands">
      <div className="code-block-toolbar">
        <span>TERMINAL</span>
        <span aria-hidden="true">● ○ ○</span>
      </div>
      <pre>
        {commands.map((command) => (
          <span key={command}>
            <b aria-hidden="true">$ </b>
            {command}
            {"\n"}
          </span>
        ))}
      </pre>
    </div>
  );
}
