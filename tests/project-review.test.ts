import assert from "node:assert/strict";
import test from "node:test";
import { projects } from "../src/lib/projects";
import {
  emptyProjectReview,
  hasProjectReviewContent,
  isPublicHttpsUrl,
  parseProjectReview,
  projectReviewChecks,
  projectReviewMarkdown,
  projectReviewReadiness,
} from "../src/lib/project-review";

const portfolio = projects[0];

test("project review requires source, live demo, checks, and explanation", () => {
  const checked = projectReviewChecks(portfolio).map((item) => item.id);
  const draft = {
    ...emptyProjectReview,
    repositoryUrl: "https://github.com/example/portfolio",
    demoUrl: "https://portfolio.example.com",
    checked,
    explanation: "I built semantic navigation and tested it with a keyboard.",
  };
  assert.equal(projectReviewReadiness(portfolio, draft).ready, true);
  assert.equal(
    projectReviewReadiness(portfolio, { ...draft, checked: checked.slice(1) })
      .ready,
    false,
  );
  assert.equal(
    projectReviewReadiness(portfolio, { ...draft, demoUrl: "" }).ready,
    false,
  );
  assert.equal(
    projectReviewReadiness(portfolio, {
      ...draft,
      demoUrl: "https://github.com/example/portfolio",
    }).ready,
    false,
  );
  assert.equal(
    projectReviewReadiness(portfolio, { ...draft, explanation: "Done" }).ready,
    false,
  );
  assert.match(projectReviewMarkdown(portfolio, draft), /\[x\] Use the site/);
});

test("project evidence accepts public HTTPS links and sanitizes saved records", () => {
  assert.equal(isPublicHttpsUrl("https://example.com/app"), true);
  assert.equal(isPublicHttpsUrl("http://example.com/app"), false);
  assert.equal(isPublicHttpsUrl("https://localhost:3000"), false);
  assert.equal(isPublicHttpsUrl("https://192.168.1.5"), false);
  assert.equal(isPublicHttpsUrl("https://my-app.local"), false);
  assert.equal(isPublicHttpsUrl("javascript:alert(1)"), false);
  const review = parseProjectReview({
    checked: ["test-0", "test-0", "invalid", 5],
    explanation: "x".repeat(2000),
    repositoryUrl: 42,
  });
  assert.deepEqual(review.checked, ["test-0"]);
  assert.equal(review.explanation.length, 1200);
  assert.equal(review.repositoryUrl, "");
  assert.equal(hasProjectReviewContent(emptyProjectReview), false);
  assert.equal(
    hasProjectReviewContent({ ...emptyProjectReview, checked: ["test-0"] }),
    true,
  );
});
