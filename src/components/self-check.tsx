"use client";

import { toggleProgress, useProgress } from "./progress";

export function SelfCheck({
  kind,
  id,
}: {
  kind: "quests" | "exercises";
  id: string;
}) {
  const progress = useProgress();
  const done = progress[kind].includes(id);
  return (
    <button
      className="button button-primary"
      type="button"
      aria-pressed={done}
      onClick={() => toggleProgress(kind, id)}
    >
      {done ? "✓ Completed on this device" : "I built and checked this →"}
    </button>
  );
}
