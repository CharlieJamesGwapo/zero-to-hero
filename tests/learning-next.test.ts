import assert from "node:assert/strict";
import test from "node:test";
import { nextLearningStep } from "../src/lib/learning-paths";
import { lessons } from "../src/lib/curriculum";

test("a selected language path resumes at its first unfinished stage", () => {
  assert.deepEqual(
    nextLearningStep("python", ["track/python/what-is-python"]),
    {
      pathTitle: "Python",
      title: "Hello World",
      href: "/tracks/python/hello-world",
    },
  );
});

test("web and open-source paths resume at real lesson routes", () => {
  assert.deepEqual(nextLearningStep("web", ["foundations/how-the-web-works"]), {
    pathTitle: "Web Development",
    title: "A page with a clear structure",
    href: "/learn/html/semantic-page",
  });
  assert.deepEqual(nextLearningStep("open-source", []), {
    pathTitle: "Git & Open Source",
    title: "What is Git?",
    href: "/open-source/git/what-is-git",
  });
});

test("unknown or completed paths have no unfinished step", () => {
  assert.equal(nextLearningStep("unknown", []), null);
  assert.equal(
    nextLearningStep(
      "web",
      lessons.map((lesson) => lesson.id),
    ),
    null,
  );
});
