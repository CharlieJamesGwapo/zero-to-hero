import assert from "node:assert/strict";
import test from "node:test";
import {
  parseProgress,
  removeCodeDraft,
  updateCodeDraft,
  updateProgress,
} from "../src/lib/progress";

test("existing saved progress migrates without losing lessons", () => {
  const progress = parseProgress(
    JSON.stringify({
      completed: ["html/semantic-page"],
      bookmarks: ["html/semantic-page"],
      projects: ["portfolio"],
    }),
  );
  assert.deepEqual(progress, {
    completed: ["html/semantic-page"],
    bookmarks: ["html/semantic-page"],
    projects: ["portfolio"],
    openSourceChecks: [],
    quests: [],
    exercises: [],
    tracks: [],
    htmlChecks: [],
    resources: [],
    projectReviews: {},
    codeDrafts: {},
  });
});

test("invalid storage is ignored and checks toggle independently", () => {
  assert.deepEqual(parseProgress("not json"), {
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
  });
  const base = parseProgress(
    JSON.stringify({
      completed: ["open-source/git/what-is-git", 9],
      openSourceChecks: ["git", "git"],
    }),
  );
  assert.deepEqual(base.completed, ["open-source/git/what-is-git"]);
  assert.deepEqual(base.openSourceChecks, ["git"]);
  const unchecked = updateProgress(base, "openSourceChecks", "git");
  assert.deepEqual(unchecked.openSourceChecks, []);
  assert.deepEqual(unchecked.completed, base.completed);
  assert.deepEqual(
    updateProgress(unchecked, "openSourceChecks", "branch").openSourceChecks,
    ["branch"],
  );
  const questDone = updateProgress(base, "quests", "hello-world");
  assert.deepEqual(questDone.quests, ["hello-world"]);
  assert.deepEqual(questDone.completed, base.completed);
});

test("code drafts restore by challenge ID without changing completion", () => {
  const base = parseProgress(null);
  const saved = updateCodeDraft(
    base,
    "exercises:reverse-string",
    "function reverseString(value) { return value; }",
    "2026-09-27T10:00:00.000Z",
  );
  assert.equal(
    parseProgress(JSON.stringify(saved)).codeDrafts["exercises:reverse-string"]
      .code,
    "function reverseString(value) { return value; }",
  );
  assert.deepEqual(saved.exercises, []);
  assert.deepEqual(
    removeCodeDraft(saved, "exercises:reverse-string").codeDrafts,
    {},
  );
});

test("invalid or oversized draft entries are ignored", () => {
  const parsed = parseProgress(
    JSON.stringify({
      codeDrafts: {
        "exercises:reverse-string": {
          code: "return value;",
          updatedAt: "2026-09-27T10:00:00.000Z",
        },
        "../../bad": { code: "bad", updatedAt: "2026-09-27T10:00:00.000Z" },
        "quests:too-long": {
          code: "x".repeat(20_001),
          updatedAt: "2026-09-27T10:00:00.000Z",
        },
        "quests:bad-date": { code: "ok", updatedAt: "yesterday" },
      },
    }),
  );
  assert.deepEqual(Object.keys(parsed.codeDrafts), [
    "exercises:reverse-string",
  ]);
});
