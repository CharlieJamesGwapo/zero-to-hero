"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import {
  htmlStarter,
  inspectHtml,
  workshopMilestones,
} from "@/lib/html-workshop";
import { toggleProgress, useProgress } from "./progress";

const DRAFT_KEY = "zero-to-hero-html-workshop-v1";
const DRAFT_EVENT = "zero-to-hero-html-draft-update";
let fallbackDraft = htmlStarter;
const subscribeDraft = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(DRAFT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DRAFT_EVENT, callback);
  };
};
const getDraft = () => {
  try {
    return localStorage.getItem(DRAFT_KEY) ?? fallbackDraft;
  } catch {
    return fallbackDraft;
  }
};
const getStarter = () => htmlStarter;
const subscribeBrowser = () => () => {};
const getBrowser = () => true;
const getServer = () => false;

function saveDraft(value: string) {
  fallbackDraft = value;
  try {
    localStorage.setItem(DRAFT_KEY, value);
  } catch {
    // The editor still works when storage is disabled.
  }
  window.dispatchEvent(new Event(DRAFT_EVENT));
}

export function HtmlWorkshop({ initialFocus }: { initialFocus?: string }) {
  const progress = useProgress();
  const code = useSyncExternalStore(subscribeDraft, getDraft, getStarter);
  const browser = useSyncExternalStore(subscribeBrowser, getBrowser, getServer);
  const [active, setActive] = useState(
    workshopMilestones.some((item) => item.id === initialFocus)
      ? initialFocus!
      : "document",
  );
  const [status, setStatus] = useState("");
  const checks = browser ? inspectHtml(code) : [];
  const current = workshopMilestones.find((item) => item.id === active)!;
  const currentChecks = checks.filter((item) => item.milestone === active);
  const passed = currentChecks.filter((item) => item.pass).length;

  function download() {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-portfolio.html";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("HTML file downloaded. Open it in a browser to review it.");
  }

  return (
    <div className="html-workshop">
      <div
        className="workshop-steps"
        role="tablist"
        aria-label="HTML milestones"
      >
        {workshopMilestones.map((item) => {
          const itemChecks = checks.filter(
            (check) => check.milestone === item.id,
          );
          const allPass =
            itemChecks.length > 0 && itemChecks.every((check) => check.pass);
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === item.id}
              className={active === item.id ? "active" : ""}
              onClick={() => setActive(item.id)}
            >
              <span>{item.title}</span>
              <small>
                {itemChecks.filter((check) => check.pass).length}/
                {itemChecks.length} checks{" "}
                {progress.htmlChecks.includes(item.id)
                  ? "· Saved"
                  : allPass
                    ? "· Ready"
                    : ""}
              </small>
            </button>
          );
        })}
      </div>
      <section className="workshop-brief" aria-label="Current milestone">
        <div>
          <span className="eyebrow">GUIDED BUILD</span>
          <h2>{current.title}</h2>
          <p>{current.brief}</p>
        </div>
        <Link className="text-link" href={current.lesson}>
          Read the lesson ↗
        </Link>
      </section>
      <div className="workshop-grid">
        <div className="workshop-editor">
          <div className="workshop-panel-head">
            <strong>index.html</strong>
            <span>Autosaved in this browser</span>
          </div>
          <label className="sr-only" htmlFor="html-code">
            Edit HTML
          </label>
          <textarea
            id="html-code"
            spellCheck={false}
            value={code}
            onChange={(event) => saveDraft(event.target.value)}
          />
        </div>
        <div className="workshop-preview">
          <div className="workshop-panel-head">
            <strong>Live preview</strong>
            <span>HTML only</span>
          </div>
          <iframe
            title="HTML workshop preview"
            srcDoc={code}
            sandbox=""
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <div className="workshop-review">
        <div>
          <span className="eyebrow">STRUCTURE CHECKS</span>
          <h3>
            {passed} of {currentChecks.length} passed
          </h3>
          <p>
            These checks look for common structural requirements. They do not
            prove that your writing, form, or full accessibility experience
            works.
          </p>
        </div>
        <ul>
          {currentChecks.map((item) => (
            <li key={item.id} className={item.pass ? "pass" : ""}>
              <strong>
                {item.pass ? "✓" : "○"} {item.label}
              </strong>
              <span>{item.help}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="workshop-actions">
        <button
          className="button button-primary"
          type="button"
          disabled={passed !== currentChecks.length}
          onClick={() => {
            toggleProgress("htmlChecks", current.id);
            setStatus(
              progress.htmlChecks.includes(current.id)
                ? "Milestone removed from saved progress."
                : "Milestone saved to your progress.",
            );
          }}
        >
          {progress.htmlChecks.includes(current.id)
            ? "✓ Milestone saved"
            : "Save milestone"}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={download}
        >
          Download HTML
        </button>
        <p role="status">{status}</p>
      </div>
    </div>
  );
}
