import { lessons, levels } from "./curriculum";
import { projects } from "./projects";
import { glossary } from "./glossary";
import { openSourceLessons } from "./open-source";
import { learningPaths } from "./learning-paths";
import { tracks } from "../../content/tracks/paths";
import { quests, exercises } from "./challenges";

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  category:
    | "Lesson"
    | "Level"
    | "Project"
    | "Glossary"
    | "Guide"
    | "Open Source"
    | "Track"
    | "Quest"
    | "Exercise"
    | "Playground";
};

export const searchItems: SearchItem[] = [
  ...learningPaths.map((path) => ({
    title: path.title,
    description: path.description,
    href: path.href,
    category: "Track" as const,
  })),
  ...tracks.flatMap((track) =>
    track.stages.map((stage) => ({
      title: stage.title,
      description: `${track.title} · ${stage.summary}`,
      href: `/tracks/${track.slug}/${stage.slug}`,
      category: "Lesson" as const,
    })),
  ),
  ...quests.map((quest) => ({
    title: quest.title,
    description: quest.objective,
    href: `/quests/${quest.slug}`,
    category: "Quest" as const,
  })),
  ...exercises.map((exercise) => ({
    title: exercise.title,
    description: exercise.objective,
    href: `/exercises/${exercise.slug}`,
    category: "Exercise" as const,
  })),
  ...lessons.map((lesson) => ({
    title: lesson.title,
    description: lesson.summary,
    href: `/learn/${lesson.levelSlug}/${lesson.slug}`,
    category: "Lesson" as const,
  })),
  ...openSourceLessons.map((lesson) => ({
    title: lesson.title,
    description: `${lesson.category} · ${lesson.summary}`,
    href: lesson.path,
    category: "Open Source" as const,
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
    title: "Code playground",
    description:
      "Run JavaScript, TypeScript, Python, or preview HTML and CSS in your browser.",
    href: "/playground",
    category: "Playground",
  },
  {
    title: "Open Source Development",
    description:
      "Git, GitHub, issues, pull requests, reviews, CI, licenses, and contributing.",
    href: "/open-source",
    category: "Guide",
  },
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
