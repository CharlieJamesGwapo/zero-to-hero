"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const layers = [
  {
    label: "Browser",
    detail: "Sends the request and renders the result",
    href: "/learn/foundations/how-the-web-works",
  },
  {
    label: "Application",
    detail: "Matches the route and coordinates the work",
    href: "/learn/nextjs/server-client-boundary",
  },
  {
    label: "API + services",
    detail: "Validates input and enforces product rules",
    href: "/learn/backend/request-to-service",
  },
  {
    label: "Database",
    detail: "Stores and retrieves durable data",
    href: "/learn/databases/modeling-data",
  },
];

export function ArchitectureTrace() {
  const [run, setRun] = useState(0);
  const [status, setStatus] = useState("Choose a layer to study it.");

  useEffect(() => {
    if (!run) return;
    const timer = window.setTimeout(() => {
      setStatus("Trace complete. The response returns to the browser.");
    }, 3700);
    return () => window.clearTimeout(timer);
  }, [run]);

  return (
    <section className="architecture-trace" aria-labelledby="trace-title">
      <div className="trace-intro">
        <span className="eyebrow">FOLLOW ONE REQUEST</span>
        <h2 id="trace-title">See the boundary, then open its lesson.</h2>
        <p>
          A user action travels from the browser through the application and
          service rules to stored data. The response follows the same path back.
        </p>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              setStatus(
                "The request reaches the database; the response returns to the browser.",
              );
              return;
            }
            setRun((current) => current + 1);
            setStatus("Tracing the request and response.");
          }}
        >
          Trace a request <span aria-hidden="true">→</span>
        </button>
        <p className="trace-status" aria-live="polite">
          {status}
        </p>
      </div>
      <div className="trace-visual" key={run} data-running={run > 0}>
        <div className="trace-rail" aria-hidden="true">
          {run > 0 && (
            <>
              <span className="trace-packet request" />
              <span className="trace-packet response" />
            </>
          )}
        </div>
        {layers.map((layer, index) => (
          <Link
            href={layer.href}
            className="trace-node"
            key={layer.label}
            style={{ "--trace-index": index } as CSSProperties}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{layer.label}</strong>
            <small>{layer.detail}</small>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
