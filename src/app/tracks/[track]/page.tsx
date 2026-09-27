import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tracks, getTrack } from "../../../../content/tracks/paths";

type Props = { params: Promise<{ track: string }> };
export function generateStaticParams() {
  return tracks.map((track) => ({ track: track.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const track = getTrack((await params).track);
  return {
    title: track?.title ?? "Learning track",
    description: track?.description,
  };
}
export default async function TrackPage({ params }: Props) {
  const track = getTrack((await params).track);
  if (!track) notFound();
  return (
    <div className="shell interactive-page">
      <Link className="sidebar-back" href="/learn">
        ← All learning paths
      </Link>
      <div className="page-intro">
        <span className="eyebrow">
          FREE LEARNING PATH / {track.audience.toUpperCase()}
        </span>
        <h1>
          {track.title}
          <em>.</em>
        </h1>
        <p>{track.description}</p>
      </div>
      <div className="track-roadmap">
        <div className="track-roadmap-head">
          <span>{track.stages.length} stages</span>
          <span>Learn → Try → Practice → Build</span>
        </div>
        {track.stages.map((item, index) => (
          <Link
            href={`/tracks/${track.slug}/${item.slug}`}
            key={item.slug}
            className="track-stage"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
            </div>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
      <div className="track-project">
        <span className="eyebrow">BUILD TO PROVE IT</span>
        <h2>{track.project}</h2>
        <Link className="text-link" href={track.projectHref}>
          Open the project or exercise ↗
        </Link>
      </div>
    </div>
  );
}
