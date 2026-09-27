import type { MetadataRoute } from "next";
import { lessons } from "@/lib/curriculum";
import { projects } from "@/lib/projects";
import { openSourceLessons } from "@/lib/open-source";
import { tracks } from "../../content/tracks/paths";
import { exercises, quests } from "@/lib/challenges";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://zerotoherodev.vercel.app";
  const paths = [
    "/",
    "/curriculum",
    "/learn",
    "/playground",
    "/quests",
    "/exercises",
    "/projects",
    "/architecture",
    "/workflow",
    "/glossary",
    "/contribute",
    "/open-source",
    ...openSourceLessons.map((lesson) => lesson.path),
    ...lessons.map((lesson) => `/learn/${lesson.levelSlug}/${lesson.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
    ...tracks.flatMap((track) => [
      `/tracks/${track.slug}`,
      ...track.stages.map((stage) => `/tracks/${track.slug}/${stage.slug}`),
    ]),
    ...quests.map((quest) => `/quests/${quest.slug}`),
    ...exercises.map((exercise) => `/exercises/${exercise.slug}`),
  ];
  return paths.map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
