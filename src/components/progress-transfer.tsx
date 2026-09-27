"use client";

import { useRef, useState } from "react";
import { exportProgress, importProgress } from "@/lib/progress-backup";
import { PROGRESS_EVENT, PROGRESS_KEY, parseProgress } from "@/lib/progress";
import { useProgress } from "./progress";

export function ProgressTransfer() {
  const progress = useProgress();
  const picker = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  function download() {
    const blob = new Blob([exportProgress(progress)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "zero-to-hero-progress.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Progress backup downloaded.");
  }

  async function restore(file: File | undefined) {
    if (!file) return;
    try {
      if (file.size > 1_000_000) throw new Error("Backup file is too large.");
      const next = importProgress(
        await file.text(),
        parseProgress(localStorage.getItem(PROGRESS_KEY)),
      );
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(PROGRESS_EVENT));
      setStatus("Backup imported. Your existing progress was kept.");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Could not import backup.",
      );
    } finally {
      if (picker.current) picker.current.value = "";
    }
  }

  return (
    <section
      className="progress-transfer dashboard-section"
      aria-labelledby="backup-title"
    >
      <div>
        <span className="eyebrow">YOUR DATA</span>
        <h2 id="backup-title">Take your progress with you.</h2>
        <p>
          Lessons, exercises, quests, code drafts, project reviews, HTML
          milestones, and saved resources live in this browser. Download a
          backup, then import it on another device. Import merges progress with
          what is already saved. Download your HTML workshop file separately
          from the workshop.
        </p>
      </div>
      <div className="progress-transfer-actions">
        <button
          className="button button-primary"
          type="button"
          onClick={download}
        >
          Download backup
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => picker.current?.click()}
        >
          Import backup
        </button>
        <input
          ref={picker}
          className="sr-only"
          aria-label="Choose progress backup JSON file"
          type="file"
          accept="application/json,.json"
          onChange={(event) => void restore(event.target.files?.[0])}
        />
      </div>
      <p className="progress-transfer-status" role="status">
        {status}
      </p>
    </section>
  );
}
