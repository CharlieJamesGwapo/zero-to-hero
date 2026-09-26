import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  openSourceChecklist,
  openSourceLessons,
  openSourceSections,
  openSourceStages,
  openSourceWorkflow,
} from "../src/lib/open-source";
import { lessons } from "../src/lib/curriculum";
import { projects } from "../src/lib/projects";
import { glossary } from "../src/lib/glossary";
import { searchIndex } from "../src/lib/search-index";

const root = process.cwd();
const openSourcePaths = new Set(openSourceLessons.map((lesson) => lesson.path));
const webPaths = new Set(
  lessons.map((lesson) => `/learn/${lesson.levelSlug}/${lesson.slug}`),
);

function contentFile(path: string) {
  return join(root, "content", `${path.slice(1)}.mdx`);
}

test("every open-source lesson has unique metadata and complete MDX sections", () => {
  assert.equal(openSourcePaths.size, openSourceLessons.length);
  for (const lesson of openSourceLessons) {
    const file = contentFile(lesson.path);
    assert.ok(existsSync(file), `Missing ${file}`);
    const source = readFileSync(file, "utf8");
    for (const section of openSourceSections) {
      assert.ok(
        source.includes(`## ${section.title}`),
        `${lesson.path} lacks ${section.title}`,
      );
    }
    assert.ok(
      lesson.summary.length > 35,
      `${lesson.path} needs a useful summary`,
    );
    assert.ok(lesson.minutes > 0);
  }
});

test("stage, workflow, checklist, glossary, and search links resolve to real routes", () => {
  for (const item of [
    ...openSourceStages,
    ...openSourceWorkflow,
    ...openSourceChecklist,
  ]) {
    assert.ok(openSourcePaths.has(item.path), `${item.path} has no lesson`);
  }
  for (const term of glossary) {
    assert.ok(
      openSourcePaths.has(term.lesson) || webPaths.has(term.lesson),
      `${term.term} links to a missing lesson`,
    );
  }
  for (const item of searchIndex("git")) {
    assert.ok(item.href.startsWith("/"));
  }
  assert.ok(
    searchIndex("merge conflict").some(
      (item) => item.href === "/open-source/git/merge-conflicts",
    ),
  );
  assert.ok(
    searchIndex("pull request").some(
      (item) => item.href === "/open-source/first-pull-request",
    ),
  );
});

test("Git reference explains every requested command", () => {
  const source = readFileSync(contentFile("/open-source/git/commands"), "utf8");
  for (const command of [
    "init",
    "clone",
    "status",
    "add",
    "commit",
    "log",
    "branch",
    "switch",
    "checkout",
    "merge",
    "pull",
    "push",
    "fetch",
    "diff",
    "restore",
    "stash",
  ]) {
    assert.ok(source.includes(`git ${command}`), `Missing git ${command}`);
  }
  assert.match(source, /Common mistake/);
});

test("project briefs include engineering and contribution guidance", () => {
  for (const project of projects) {
    assert.ok(
      project.architecture.length > 40,
      `${project.slug} architecture is too short`,
    );
    assert.ok(project.issues.length >= 3);
    assert.ok(project.testing.length >= 3);
    assert.ok(project.deployment.length > 30);
    assert.ok(project.contribution.length > 30);
  }
});
