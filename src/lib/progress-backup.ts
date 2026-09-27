import { parseProgress, type Progress } from "./progress";

const backupFormat = "zero-to-hero-progress";
const backupVersion = 1;

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
  if (input.length > 100_000) throw new Error("Backup file is too large.");
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
  return Object.fromEntries(
    (Object.keys(current) as (keyof Progress)[]).map((key) => [
      key,
      [...new Set([...current[key], ...saved[key]])],
    ]),
  ) as Progress;
}
