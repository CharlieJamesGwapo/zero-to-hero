import {
  parseProgress,
  type Progress,
  type ProgressListKind,
} from "./progress";

const backupFormat = "zero-to-hero-progress";
const backupVersion = 1;
const listKinds: ProgressListKind[] = [
  "completed",
  "bookmarks",
  "projects",
  "openSourceChecks",
  "quests",
  "exercises",
  "tracks",
  "htmlChecks",
  "resources",
];

export function exportProgress(progress: Progress, exportedAt = new Date()) {
  return JSON.stringify(
    {
      format: backupFormat,
      version: backupVersion,
      exportedAt: exportedAt.toISOString(),
      progress,
    },
    null,
    2,
  );
}

export function importProgress(input: string, current: Progress): Progress {
  if (input.length > 1_000_000) throw new Error("Backup file is too large.");
  let data: unknown;
  try {
    data = JSON.parse(input);
  } catch {
    throw new Error("This is not a valid JSON backup.");
  }
  if (!data || typeof data !== "object")
    throw new Error("Invalid backup format.");
  const record = data as Record<string, unknown>;
  if (
    record.format !== backupFormat ||
    record.version !== backupVersion ||
    !record.progress ||
    typeof record.progress !== "object" ||
    Array.isArray(record.progress)
  ) {
    throw new Error("This is not a supported ZERO → HERO progress backup.");
  }
  const saved = parseProgress(JSON.stringify(record.progress));
  const lists = Object.fromEntries(
    listKinds.map((key) => [
      key,
      [...new Set([...current[key], ...saved[key]])],
    ]),
  ) as Pick<Progress, ProgressListKind>;
  const projectReviews = { ...current.projectReviews };
  for (const [slug, review] of Object.entries(saved.projectReviews)) {
    const existing = projectReviews[slug];
    if (!existing || review.updatedAt > existing.updatedAt)
      projectReviews[slug] = review;
  }
  const codeDrafts = { ...current.codeDrafts };
  for (const [id, draft] of Object.entries(saved.codeDrafts)) {
    const existing = codeDrafts[id];
    if (!existing || draft.updatedAt > existing.updatedAt)
      codeDrafts[id] = draft;
  }
  return { ...lists, projectReviews, codeDrafts };
}
