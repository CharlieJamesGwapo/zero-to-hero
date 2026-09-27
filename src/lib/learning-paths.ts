import { tracks } from "../../content/tracks/paths";
import { openSourceLessons } from "./open-source";
import { levels, lessons } from "./curriculum";

export const learningPaths = [
  {
    slug: "web",
    title: "Web Development",
    description:
      "Build websites and full-stack apps from HTML through architecture.",
    href: "/curriculum",
    count: levels.length,
    label: `${levels.length} levels`,
  },
  ...tracks.map((track) => ({
    slug: track.slug,
    title: track.title,
    description: track.description,
    href: `/tracks/${track.slug}`,
    count: track.stages.length,
    label: `${track.stages.length} stages`,
  })),
  {
    slug: "open-source",
    title: "Git & Open Source",
    description:
      "Practice branches, commits, pull requests, reviews, and contribution.",
    href: "/open-source",
    count: openSourceLessons.length,
    label: "Git to contribution",
  },
];

export type NextLearningStep = {
  pathTitle: string;
  title: string;
  href: string;
};

export function nextLearningStep(
  pathSlug: string,
  completed: readonly string[],
): NextLearningStep | null {
  const pathTitle = learningPaths.find((path) => path.slug === pathSlug)?.title;
  if (!pathTitle) return null;
  const done = new Set(completed);

  if (pathSlug === "web") {
    const lesson = lessons.find((item) => !done.has(item.id));
    return lesson
      ? {
          pathTitle,
          title: lesson.title,
          href: `/learn/${lesson.levelSlug}/${lesson.slug}`,
        }
      : null;
  }

  if (pathSlug === "open-source") {
    const lesson = openSourceLessons.find(
      (item) => !done.has(item.path.slice(1)),
    );
    return lesson
      ? { pathTitle, title: lesson.title, href: lesson.path }
      : null;
  }

  const track = tracks.find((item) => item.slug === pathSlug);
  const stage = track?.stages.find(
    (item) => !done.has(`track/${pathSlug}/${item.slug}`),
  );
  return stage
    ? {
        pathTitle,
        title: stage.title,
        href: `/tracks/${pathSlug}/${stage.slug}`,
      }
    : null;
}
