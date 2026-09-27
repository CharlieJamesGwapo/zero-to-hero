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
};
export const PROGRESS_KEY = "zero-to-hero-progress-v1";
export const PROGRESS_EVENT = "zero-to-hero-progress-update";

export function parseProgress(value: string | null): Progress {
  if (!value)
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
    };
  try {
    const data: unknown = JSON.parse(value);
    if (!data || typeof data !== "object")
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
      };
    const record = data as Record<string, unknown>;
    const strings = (input: unknown) =>
      Array.isArray(input)
        ? [
            ...new Set(
              input.filter((item): item is string => typeof item === "string"),
            ),
          ]
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
    };
  } catch {
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
    };
  }
}

export function updateProgress(
  current: Progress,
  kind: keyof Progress,
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
