import { lessons, levels } from "./curriculum";
import { projects } from "./projects";
import { glossary } from "./glossary";

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  category: "Lesson" | "Level" | "Project" | "Glossary" | "Guide";
};

export const searchItems: SearchItem[] = [
  ...lessons.map((lesson) => ({
    title: lesson.title,
    description: lesson.summary,
    href: `/learn/${lesson.levelSlug}/${lesson.slug}`,
    category: "Lesson" as const,
  })),
  ...levels.map((level) => ({
    title: level.title,
    description: level.description,
    href: `/curriculum#${level.slug}`,
    category: "Level" as const,
  })),
  ...projects.map((project) => ({
    title: project.title,
    description: project.description,
    href: `/projects/${project.slug}`,
    category: "Project" as const,
  })),
  ...glossary.map((term) => ({
    title: term.term,
    description: term.definition,
    href: `/glossary#${term.slug}`,
    category: "Glossary" as const,
  })),
  {
    title: "Software architecture",
    description: "Four system shapes and the reasons to use them.",
    href: "/architecture",
    category: "Guide",
  },
  {
    title: "How software actually gets built",
    description: "From requirement to monitored release.",
    href: "/workflow",
    category: "Guide",
  },
];

export function searchIndex(
  query: string,
  items: SearchItem[] = searchItems,
): SearchItem[] {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return items.slice(0, 8);
  return items
    .filter((item) =>
      words.every((word) =>
        `${item.title} ${item.description} ${item.category}`
          .toLocaleLowerCase()
          .includes(word),
      ),
    )
    .slice(0, 12);
}
