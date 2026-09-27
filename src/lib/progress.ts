import { parseProjectReview, type ProjectReview } from "./project-review";

export type Progress = {
  completed: string[];
  bookmarks: string[];
  projects: string[];
  openSourceChecks: string[];
  quests: string[];
  exercises: string[];
  tracks: string[];
  htmlChecks: string[];
  resources: string[];
  projectReviews: Record<string, ProjectReview>;
};
export type ProgressListKind = Exclude<keyof Progress, "projectReviews">;
export const PROGRESS_KEY = "zero-to-hero-progress-v1";
export const PROGRESS_EVENT = "zero-to-hero-progress-update";

function emptyProgress(): Progress {
  return {
    completed: [],
    bookmarks: [],
    projects: [],
    openSourceChecks: [],
    quests: [],
    exercises: [],
    tracks: [],
    htmlChecks: [],
    resources: [],
    projectReviews: {},
  };
}

export function parseProgress(value: string | null): Progress {
  if (!value) return emptyProgress();
  try {
    const data: unknown = JSON.parse(value);
    if (!data || typeof data !== "object" || Array.isArray(data))
      return emptyProgress();
    const record = data as Record<string, unknown>;
    const strings = (input: unknown) =>
      Array.isArray(input)
        ? [
            ...new Set(
              input.filter((item): item is string => typeof item === "string"),
            ),
          ]
        : [];
    const reviewEntries =
      record.projectReviews &&
      typeof record.projectReviews === "object" &&
      !Array.isArray(record.projectReviews)
        ? Object.entries(record.projectReviews)
            .filter(([slug]) => /^[a-z0-9-]{1,50}$/.test(slug))
            .slice(0, 20)
            .map(([slug, review]) => [slug, parseProjectReview(review)])
        : [];
    return {
      completed: strings(record.completed),
      bookmarks: strings(record.bookmarks),
      projects: strings(record.projects),
      openSourceChecks: strings(record.openSourceChecks),
      quests: strings(record.quests),
      exercises: strings(record.exercises),
      tracks: strings(record.tracks),
      htmlChecks: strings(record.htmlChecks),
      resources: strings(record.resources),
      projectReviews: Object.fromEntries(reviewEntries),
    };
  } catch {
    return emptyProgress();
  }
}

export function updateProgress(
  current: Progress,
  kind: ProgressListKind,
  id: string,
): Progress {
  const list = current[kind];
  return {
    ...current,
    [kind]: list.includes(id)
      ? list.filter((item) => item !== id)
      : [...list, id],
  };
}

export function updateProjectReview(
  current: Progress,
  slug: string,
  review: ProjectReview,
): Progress {
  return {
    ...current,
    projectReviews: {
      ...current.projectReviews,
      [slug]: parseProjectReview(review),
    },
  };
}
