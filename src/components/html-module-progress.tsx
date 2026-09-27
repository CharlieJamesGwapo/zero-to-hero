"use client";
import { levels } from "@/lib/curriculum";
import { workshopMilestones } from "@/lib/html-workshop";
import { useProgress } from "./progress";
const htmlLessons = levels.find((level) => level.slug === "html")!.lessons;
export function HtmlModuleProgress() {
  const progress = useProgress();
  const done = htmlLessons.filter((item) =>
    progress.completed.includes(item.id),
  ).length;
  const built = workshopMilestones.filter((item) =>
    progress.htmlChecks.includes(item.id),
  ).length;
  return (
    <div className="module-progress">
      <strong>
        {done}/{htmlLessons.length} lessons complete
      </strong>
      <strong>
        {built}/{workshopMilestones.length} workshop milestones saved
      </strong>
      <span>
        Progress stays on this device. Export it from your Learn dashboard.
      </span>
    </div>
  );
}
