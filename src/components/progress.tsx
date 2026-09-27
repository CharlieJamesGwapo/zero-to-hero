"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { openSourceChecklist, openSourceLessons } from "@/lib/open-source";
import { lessons } from "@/lib/curriculum";
import {
  PROGRESS_EVENT,
  PROGRESS_KEY,
  parseProgress,
  updateProgress,
  updateProjectReview,
} from "@/lib/progress";
import type { ProjectReview } from "@/lib/project-review";

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

export function toggleProgress(
  kind:
    | "completed"
    | "bookmarks"
    | "projects"
    | "openSourceChecks"
    | "quests"
    | "exercises"
    | "tracks"
    | "htmlChecks"
    | "resources",
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

export function saveProjectReview(slug: string, review: ProjectReview) {
  try {
    const next = updateProjectReview(
      parseProgress(localStorage.getItem(PROGRESS_KEY)),
      slug,
      review,
    );
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(PROGRESS_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function ProgressSummary({ total }: { total: number }) {
  const progress = useProgress();
  const count = Math.min(
    progress.completed.filter((id) => lessons.some((item) => item.id === id))
      .length,
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
  const [announcement, setAnnouncement] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  return (
    <div className="lesson-actions">
      <button
        className={`button button-primary ${complete ? "button-done" : ""}`}
        type="button"
        aria-pressed={complete}
        onClick={() => {
          toggleProgress("completed", id);
          setAnnouncement(complete ? "" : "Lesson complete");
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setAnnouncement(""), 1800);
        }}
      >
        {complete ? "✓ Completed" : "Mark complete"}
      </button>
      <button
        className="button button-secondary"
        type="button"
        aria-pressed={bookmarked}
        onClick={() => toggleProgress("bookmarks", id)}
      >
        {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
      </button>
      <span className="lesson-complete-note" role="status">
        {announcement}
      </span>
    </div>
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

const journey = [
  { label: "Git", path: "/open-source/git/what-is-git" },
  { label: "GitHub", path: "/open-source/github/what-is-github" },
  { label: "Branches", path: "/open-source/git/branches" },
  { label: "Pull requests", path: "/open-source/first-pull-request" },
  { label: "Code review", path: "/open-source/code-review" },
];

export function OpenSourceJourney() {
  const progress = useProgress();
  const current = journey.findIndex(
    (item) => !progress.completed.includes(item.path.slice(1)),
  );
  return (
    <ol className="os-journey" aria-label="Open source milestones">
      {journey.map((item, index) => {
        const done = progress.completed.includes(item.path.slice(1));
        return (
          <li key={item.path} data-complete={done}>
            <Link
              href={item.path}
              aria-current={index === current ? "step" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <span>{done ? "✓" : index === current ? "Current →" : "○"}</span>
            </Link>
          </li>
        );
      })}
    </ol>
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
              onClick={() => toggleProgress("openSourceChecks", item.id)}
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
