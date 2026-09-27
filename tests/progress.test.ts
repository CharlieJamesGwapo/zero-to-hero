import assert from "node:assert/strict";
import test from "node:test";
import { parseProgress, updateProgress } from "../src/lib/progress";

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
