import type { Metadata } from "next";
import Link from "next/link";
import { ResourceExplorer } from "@/components/resource-explorer";
export const metadata: Metadata = {
  title: "Learning resources",
  description:
    "Find free official guides and selected video tutorials for web development.",
};
export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return (
    <div className="shell page-wrap">
      <div className="page-intro">
        <span className="eyebrow">LEARNING LIBRARY</span>
        <h1>
          Find a good <em>next resource.</em>
        </h1>
        <p>
          Original lessons here, with carefully selected guides and free videos
          when you want another explanation. Preview each resource, watch videos
          here, and save useful links on this device.
        </p>
        <div className="hero-actions">
          <Link className="button button-secondary" href="/learn/html">
            Start the guided HTML module →
          </Link>
          <Link className="button button-secondary" href="/ai">
            Explore AI workflows →
          </Link>
        </div>
      </div>
      <ResourceExplorer initialTopic={topic} />
    </div>
  );
}
