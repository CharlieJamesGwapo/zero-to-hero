"use client";

import Link from "next/link";
import { useState } from "react";

const choices = [
  {
    id: "zero",
    label: "Complete beginner",
    href: "/learn/foundations/how-the-web-works",
    reason:
      "Start with how a browser receives a page, then build your first document.",
  },
  {
    id: "html-css",
    label: "I know HTML & CSS",
    href: "/learn/javascript/state-and-events",
    reason: "Use JavaScript to connect a user action to data and the page.",
  },
  {
    id: "javascript",
    label: "I know JavaScript",
    href: "/learn/typescript/types-at-boundaries",
    reason:
      "Make data assumptions explicit before moving into larger UI systems.",
  },
  {
    id: "react",
    label: "I know React",
    href: "/learn/nextjs/server-client-boundary",
    reason: "Learn where code belongs when a product spans server and browser.",
  },
  {
    id: "apps",
    label: "I build applications",
    href: "/learn/production/reliable-features",
    reason: "Focus on failure paths, observability, and delivery discipline.",
  },
];

export function StartChooser() {
  const [selected, setSelected] = useState<string | null>(null);
  const choice = choices.find((item) => item.id === selected);
  return (
    <section className="start-chooser" aria-labelledby="start-title">
      <div className="start-intro">
        <span className="eyebrow">A PRACTICAL ENTRY POINT</span>
        <h2 id="start-title">Where should I start?</h2>
        <p>
          Choose what you can already build independently. The recommendation is
          a starting point, not a test.
        </p>
      </div>
      <div
        className="start-options"
        role="group"
        aria-label="Current experience"
      >
        {choices.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              selected === item.id ? "start-option selected" : "start-option"
            }
            aria-pressed={selected === item.id}
            onClick={() => setSelected(item.id)}
          >
            {item.label}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      {choice && (
        <div className="start-recommendation" aria-live="polite">
          <div>
            <span className="eyebrow">RECOMMENDED START</span>
            <p>{choice.reason}</p>
          </div>
          <Link className="button button-primary" href={choice.href}>
            Open first lesson <span aria-hidden="true">↗</span>
          </Link>
        </div>
      )}
    </section>
  );
}
