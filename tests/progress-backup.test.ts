import assert from "node:assert/strict";
import test from "node:test";
import { parseProgress } from "../src/lib/progress";
import { exportProgress, importProgress } from "../src/lib/progress-backup";

test("backup round trip preserves new and old progress without duplicates", () => {
  const saved = parseProgress(
    JSON.stringify({
      completed: ["html/semantic-page"],
      resources: ["mdn-html"],
      projectReviews: {
        portfolio: {
          repositoryUrl: "https://github.com/example/portfolio",
          demoUrl: "https://portfolio.example.com",
          checked: ["test-0"],
          explanation: "I built a page with semantic navigation.",
          nextStep: "Improve keyboard focus.",
          updatedAt: "2026-09-27T10:00:00.000Z",
        },
      },
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
  assert.equal(
    merged.projectReviews.portfolio.repositoryUrl,
    "https://github.com/example/portfolio",
  );
});

test("backup keeps a newer local project review", () => {
  const saved = parseProgress(
    JSON.stringify({
      projectReviews: {
        portfolio: {
          explanation: "Older review",
          updatedAt: "2026-09-26T10:00:00.000Z",
        },
      },
    }),
  );
  const current = parseProgress(
    JSON.stringify({
      projectReviews: {
        portfolio: {
          explanation: "Newer review",
          updatedAt: "2026-09-27T10:00:00.000Z",
        },
      },
    }),
  );
  assert.equal(
    importProgress(exportProgress(saved), current).projectReviews.portfolio
      .explanation,
    "Newer review",
  );
});

test("foreign or malformed backups cannot alter progress", () => {
  const current = parseProgress(null);
  assert.throws(() => importProgress("bad", current), /valid JSON/);
  assert.throws(
    () => importProgress(JSON.stringify({ progress: {} }), current),
    /supported/,
  );
});
