"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { openSourceChecklist, openSourceLessons } from "@/lib/open-source";
import {
  PROGRESS_EVENT,
  PROGRESS_KEY,
  parseProgress,
  updateProgress,
} from "@/lib/progress";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(PROGRESS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PROGRESS_EVENT, callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(PROGRESS_KEY) ?? "";
  } catch {
    return "";
  }
}

export function useProgress() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "");
  return parseProgress(snapshot);
}

function toggle(
  kind: "completed" | "bookmarks" | "projects" | "openSourceChecks",
  id: string,
) {
  try {
    const next = updateProgress(
      parseProgress(localStorage.getItem(PROGRESS_KEY)),
      kind,
      id,
    );
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  } catch {
    // The lesson remains usable when storage is disabled.
  }
}

export function ProgressSummary({ total }: { total: number }) {
  const progress = useProgress();
  const count = Math.min(
    progress.completed.filter((id) => !id.startsWith("open-source/")).length,
    total,
  );
  const percent = total ? Math.round((count / total) * 100) : 0;
  return (
    <div
      className="progress-summary"
      aria-label={`${count} of ${total} lessons complete`}
    >
      <div className="progress-summary-top">
        <span>Your progress</span>
        <strong>
          {count} / {total}
        </strong>
      </div>
      <div className="progress-track">
        <span style={{ width: `${percent}%` }} />
      </div>
      <p>
        {progress.projects.length} projects complete · Saved in this browser. No
        account needed.
      </p>
    </div>
  );
}

export function LevelProgress({ ids }: { ids: string[] }) {
  const progress = useProgress();
  const count = ids.filter((id) => progress.completed.includes(id)).length;
  return (
    <span className="level-progress">
      {count} / {ids.length} complete
    </span>
  );
}

export function LessonActions({ id }: { id: string }) {
  const progress = useProgress();
  const complete = progress.completed.includes(id);
  const bookmarked = progress.bookmarks.includes(id);
  return (
    <div className="lesson-actions">
      <button
        className={`button button-primary ${complete ? "button-done" : ""}`}
        type="button"
        aria-pressed={complete}
        onClick={() => toggle("completed", id)}
      >
        {complete ? "✓ Completed" : "Mark complete"}
      </button>
      <button
        className="button button-secondary"
        type="button"
        aria-pressed={bookmarked}
        onClick={() => toggle("bookmarks", id)}
      >
        {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
      </button>
    </div>
  );
}

export function ProjectAction({ id }: { id: string }) {
  const progress = useProgress();
  const complete = progress.projects.includes(id);
  return (
    <button
      className={`button button-primary ${complete ? "button-done" : ""}`}
      type="button"
      aria-pressed={complete}
      onClick={() => toggle("projects", id)}
    >
      {complete ? "✓ Project complete" : "Mark project complete"}
    </button>
  );
}

export function OpenSourceProgress() {
  const progress = useProgress();
  const count = openSourceLessons.filter((item) =>
    progress.completed.includes(item.path.slice(1)),
  ).length;
  const percent = Math.round((count / openSourceLessons.length) * 100);
  return (
    <div
      className="progress-summary"
      aria-label={`${count} of ${openSourceLessons.length} open-source lessons complete`}
    >
      <div className="progress-summary-top">
        <span>Open-source track</span>
        <strong>
          {count} / {openSourceLessons.length}
        </strong>
      </div>
      <div className="progress-track">
        <span style={{ width: `${percent}%` }} />
      </div>
      <p>Progress stays in this browser.</p>
    </div>
  );
}

export function OpenSourceChecklist() {
  const progress = useProgress();
  return (
    <section className="os-checklist" aria-labelledby="os-checklist-title">
      <div className="os-checklist-head">
        <div>
          <span className="eyebrow">A PRACTICAL CHECK</span>
          <h2 id="os-checklist-title">Can you do it?</h2>
        </div>
        <strong>
          {progress.openSourceChecks.length} / {openSourceChecklist.length}
        </strong>
      </div>
      <ol>
        {openSourceChecklist.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              aria-pressed={progress.openSourceChecks.includes(item.id)}
              onClick={() => toggle("openSourceChecks", item.id)}
              aria-label={`${progress.openSourceChecks.includes(item.id) ? "Uncheck" : "Check"}: ${item.label}`}
            >
              <span aria-hidden="true">
                {progress.openSourceChecks.includes(item.id) ? "✓" : ""}
              </span>
            </button>
            <span>{item.label}</span>
            <Link href={item.path} aria-label={`Learn: ${item.label}`}>
              Read lesson ↗
            </Link>
          </li>
        ))}
      </ol>
      <p>
        Check each item when you can demonstrate it. These notes are saved only
        on this device.
      </p>
    </section>
  );
}
