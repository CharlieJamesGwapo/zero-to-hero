import type { MetadataRoute } from "next";
import { lessons } from "@/lib/curriculum";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://zero-to-hero.vercel.app";
  const paths = [
    "/",
    "/curriculum",
    "/projects",
    "/architecture",
    "/workflow",
    "/glossary",
    "/contribute",
    ...lessons.map((lesson) => `/learn/${lesson.levelSlug}/${lesson.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
  ];
  return paths.map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
