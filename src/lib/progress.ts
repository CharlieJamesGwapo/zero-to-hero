import { parseProjectReview, type ProjectReview } from "./project-review";

export type CodeDraft = { code: string; updatedAt: string };
export const MAX_CODE_DRAFT_LENGTH = 20_000;
const codeDraftId = /^(?:quests|exercises):[a-z0-9-]{1,80}$/;
const isoTimestamp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function parseCodeDraft(value: unknown): CodeDraft | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (
    typeof record.code !== "string" ||
    record.code.length > MAX_CODE_DRAFT_LENGTH ||
    typeof record.updatedAt !== "string" ||
    !isoTimestamp.test(record.updatedAt) ||
    !Number.isFinite(Date.parse(record.updatedAt))
  )
    return null;
  return { code: record.code, updatedAt: record.updatedAt };
}

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
  codeDrafts: Record<string, CodeDraft>;
};
export type ProgressListKind = Exclude<
  keyof Progress,
  "projectReviews" | "codeDrafts"
>;
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
    codeDrafts: {},
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
    const draftEntries =
      record.codeDrafts &&
      typeof record.codeDrafts === "object" &&
      !Array.isArray(record.codeDrafts)
        ? Object.entries(record.codeDrafts)
            .filter(([id]) => codeDraftId.test(id))
            .map(([id, draft]) => [id, parseCodeDraft(draft)] as const)
            .filter((entry): entry is readonly [string, CodeDraft] =>
              Boolean(entry[1]),
            )
            .slice(0, 40)
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
      codeDrafts: Object.fromEntries(draftEntries),
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

export function updateCodeDraft(
  current: Progress,
  id: string,
  code: string,
  updatedAt = new Date().toISOString(),
): Progress {
  if (!codeDraftId.test(id)) throw new Error("Invalid coding activity ID.");
  const draft = parseCodeDraft({ code, updatedAt });
  if (!draft) throw new Error("Draft is too long or has an invalid date.");
  if (!current.codeDrafts[id] && Object.keys(current.codeDrafts).length >= 40)
    throw new Error("Draft storage limit reached.");
  return {
    ...current,
    codeDrafts: { ...current.codeDrafts, [id]: draft },
  };
}

export function removeCodeDraft(current: Progress, id: string): Progress {
  if (!current.codeDrafts[id]) return current;
  const codeDrafts = { ...current.codeDrafts };
  delete codeDrafts[id];
  return { ...current, codeDrafts };
}
