import assert from "node:assert/strict";
import test from "node:test";
import { parseProgress } from "../src/lib/progress";
import { exportProgress, importProgress } from "../src/lib/progress-backup";

test("backup round trip preserves new and old progress without duplicates", () => {
  const saved = parseProgress(
    JSON.stringify({
      completed: ["html/semantic-page"],
      resources: ["mdn-html"],
    }),
  );
  const current = parseProgress(
    JSON.stringify({
      completed: ["html/semantic-page", "css/layout-with-intent"],
      htmlChecks: ["structure"],
    }),
  );
  const merged = importProgress(exportProgress(saved), current);
  assert.deepEqual(merged.completed, [
    "html/semantic-page",
    "css/layout-with-intent",
  ]);
  assert.deepEqual(merged.resources, ["mdn-html"]);
  assert.deepEqual(merged.htmlChecks, ["structure"]);
});

test("foreign or malformed backups cannot alter progress", () => {
  const current = parseProgress(null);
  assert.throws(() => importProgress("bad", current), /valid JSON/);
  assert.throws(
    () => importProgress(JSON.stringify({ progress: {} }), current),
    /supported/,
  );
});
