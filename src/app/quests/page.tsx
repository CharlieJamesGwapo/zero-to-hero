import type { Metadata } from "next";
import { quests } from "@/lib/challenges";
import { ChallengeCatalog } from "@/components/challenge-catalog";

export const metadata: Metadata = {
  title: "Quests",
  description:
    "Structured missions that turn programming concepts into working code and projects.",
};
export default async function QuestsPage({
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
        <span className="eyebrow">QUESTS / LEARN BY DOING</span>
        <h1>
          Solve a problem. <em>Build the proof.</em>
        </h1>
        <p>
          Start with a first line of code and progress toward applications you
          can test and ship.
        </p>
      </div>
      <ChallengeCatalog kind="quests" items={quests} query={query} />
    </div>
  );
}
