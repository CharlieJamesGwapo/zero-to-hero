import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  tracks,
  getTrack,
  getStage,
} from "../../../../../content/tracks/paths";
import { LessonActions } from "@/components/progress";
import { CodeWorkbench } from "@/components/code-workbench";

type Props = { params: Promise<{ track: string; stage: string }> };
export function generateStaticParams() {
  return tracks.flatMap((track) =>
    track.stages.map((stage) => ({ track: track.slug, stage: stage.slug })),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track, stage } = await params;
  const item = getStage(track, stage);
  return { title: item?.title ?? "Lesson", description: item?.summary };
}
export default async function StagePage({ params }: Props) {
  const { track: slug, stage: stageSlug } = await params;
  const track = getTrack(slug);
  const item = getStage(slug, stageSlug);
  if (!track || !item) notFound();
  const index = track.stages.findIndex((entry) => entry.slug === stageSlug);
  const previous = track.stages[index - 1];
  const next = track.stages[index + 1];
  return (
    <div className="shell stage-layout">
      <aside className="stage-sidebar">
        <Link className="sidebar-back" href={`/tracks/${slug}`}>
          ← {track.title}
        </Link>
        <div className="sidebar-heading">
          THE PATH <span>{track.stages.length} STAGES</span>
        </div>
        <nav aria-label={`${track.title} stages`}>
          {track.stages.map((entry, number) => (
            <Link
              key={entry.slug}
              className={entry.slug === stageSlug ? "current" : ""}
              aria-current={entry.slug === stageSlug ? "page" : undefined}
              href={`/tracks/${slug}/${entry.slug}`}
            >
              <span>{String(number + 1).padStart(2, "0")}</span>
              {entry.title}
            </Link>
          ))}
        </nav>
      </aside>
      <article className="stage-article">
        <span className="eyebrow">
          {track.title.toUpperCase()} / STAGE{" "}
          {String(index + 1).padStart(2, "0")}
        </span>
        <h1>{item.title}</h1>
        <p className="stage-lead">{item.summary}</p>
        <div className="stage-divider" />
        <h2>The idea</h2>
        <p>{item.summary}</p>
        <p>
          Read the example, predict what it will do, and then run it. Change one
          part and compare the result with your prediction.
        </p>
        <h2>Try it yourself</h2>
        <CodeWorkbench language={track.language} starter={item.example} />
        <Link
          className="text-link stage-playground-link"
          href={`/playground?language=${track.language}&code=${encodeURIComponent(item.example)}`}
        >
          Open in the full playground ↗
        </Link>
        <h2>Practice</h2>
        <p>{item.practice}</p>
        <div className="stage-actions">
          <LessonActions id={`track/${slug}/${stageSlug}`} />
        </div>
        <nav className="stage-next" aria-label="Lesson navigation">
          {previous ? (
            <Link href={`/tracks/${slug}/${previous.slug}`}>
              ← {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/tracks/${slug}/${next.slug}`}>{next.title} →</Link>
          ) : (
            <Link href={track.projectHref}>Build: {track.project} →</Link>
          )}
        </nav>
      </article>
    </div>
  );
}
