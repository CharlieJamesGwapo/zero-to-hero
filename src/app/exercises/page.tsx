import type { Metadata } from "next";
import { exercises } from "@/lib/challenges";
import { ChallengeCatalog } from "@/components/challenge-catalog";

export const metadata: Metadata = {
  title: "Exercises",
  description:
    "Short, free programming exercises with runnable browser checks and useful hints.",
};
export default async function ExercisesPage({
  searchParams,
}: {
  searchParams: Promise<{
    language?: string;
    difficulty?: string;
    topic?: string;
  }>;
}) {
  const query = await searchParams;
  return (
    <div className="shell interactive-page">
      <div className="page-intro">
        <span className="eyebrow">PRACTICE / SMALL & FOCUSED</span>
        <h1>
          Make the concepts <em>stick.</em>
        </h1>
        <p>
          Try a short problem, run visible checks, read the result, and revise.
          All exercises are free.
        </p>
      </div>
      <ChallengeCatalog kind="exercises" items={exercises} query={query} />
    </div>
  );
}
