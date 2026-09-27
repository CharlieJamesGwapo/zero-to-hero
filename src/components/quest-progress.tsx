"use client";

import { quests } from "@/lib/challenges";
import { useProgress } from "./progress";

export function QuestProgress({ current }: { current: string }) {
  const progress = useProgress();
  const count = quests.filter((item) =>
    progress.quests.includes(item.slug),
  ).length;
  const index = quests.findIndex((item) => item.slug === current) + 1;
  return (
    <div className="quest-progress">
      <div>
        <span>
          QUEST {String(index).padStart(2, "0")} /{" "}
          {String(quests.length).padStart(2, "0")}
        </span>
        <strong>{count} completed</strong>
      </div>
      <div className="progress-track">
        <span
          style={{ width: `${Math.round((count / quests.length) * 100)}%` }}
        />
      </div>
    </div>
  );
}
