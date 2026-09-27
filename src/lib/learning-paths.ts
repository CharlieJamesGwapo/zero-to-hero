import { tracks } from "../../content/tracks/paths";
import { openSourceLessons } from "./open-source";
import { levels } from "./curriculum";

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
