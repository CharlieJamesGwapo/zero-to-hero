"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import {
  emptyProjectReview,
  isPublicHttpsUrl,
  projectReviewChecks,
  projectReviewMarkdown,
  projectReviewReadiness,
  type ProjectReview,
} from "@/lib/project-review";
import { saveProjectReview, toggleProgress, useProgress } from "./progress";

export function ProjectReviewWorkspace({ project }: { project: Project }) {
  const progress = useProgress();
  const storedReview = progress.projectReviews[project.slug];
  const [draft, setDraft] = useState<ProjectReview | null>(null);
  const review =
    draft && (!storedReview || draft.updatedAt >= storedReview.updatedAt)
      ? draft
      : (storedReview ?? emptyProjectReview);
  const [status, setStatus] = useState("");

  const checks = projectReviewChecks(project);
  const readiness = projectReviewReadiness(project, review);
  const complete = progress.projects.includes(project.slug);

  function save(patch: Partial<ProjectReview>) {
    const next = {
      ...review,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    setDraft(next);
    setStatus(
      saveProjectReview(project.slug, next)
        ? ""
        : "Storage is unavailable. Download your review before leaving this page.",
    );
  }

  function toggleCheck(id: string) {
    save({
      checked: review.checked.includes(id)
        ? review.checked.filter((item) => item !== id)
        : [...review.checked, id],
    });
  }

  function downloadReview() {
    const text = projectReviewMarkdown(project, review);
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/markdown;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.slug}-review.md`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(
      "Review summary downloaded. Share it with a mentor for feedback.",
    );
  }

  return (
    <section
      id="project-review"
      className="project-review-workspace"
      aria-labelledby="project-review-title"
    >
      <div className="project-review-header">
        <div>
          <span className="eyebrow">PROJECT REVIEW WORKSPACE</span>
          <h2 id="project-review-title">Show the work behind the result.</h2>
          <p>
            Save your links, check the real user flow, and write down an
            engineering choice. Changes save automatically in this browser and
            are included in your progress backup.
          </p>
        </div>
        <div
          className="project-review-score"
          aria-label={`${readiness.passed} of ${readiness.total} review checks done`}
        >
          <strong>
            {readiness.passed}/{readiness.total}
          </strong>
          <span>checks reviewed</span>
        </div>
      </div>

      <div className="project-review-fields">
        <div className="project-review-field">
          <label htmlFor={`${project.slug}-repository-url`}>
            Source repository URL
          </label>
          <input
            id={`${project.slug}-repository-url`}
            type="url"
            inputMode="url"
            placeholder="https://github.com/you/project"
            value={review.repositoryUrl}
            maxLength={500}
            onChange={(event) => save({ repositoryUrl: event.target.value })}
          />
          {isPublicHttpsUrl(review.repositoryUrl) && (
            <a
              href={review.repositoryUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open source ↗
            </a>
          )}
        </div>
        <div className="project-review-field">
          <label htmlFor={`${project.slug}-demo-url`}>Live demo URL</label>
          <input
            id={`${project.slug}-demo-url`}
            type="url"
            inputMode="url"
            placeholder="https://your-project.example"
            value={review.demoUrl}
            maxLength={500}
            onChange={(event) => save({ demoUrl: event.target.value })}
          />
          {isPublicHttpsUrl(review.demoUrl) && (
            <a
              href={review.demoUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open demo ↗
            </a>
          )}
        </div>
      </div>

      <div className="project-review-checks">
        {["Test the working flow", "Review the result"].map((group) => (
          <fieldset key={group}>
            <legend>{group}</legend>
            {checks
              .filter((check) => check.group === group)
              .map((check) => (
                <label key={check.id}>
                  <input
                    type="checkbox"
                    checked={review.checked.includes(check.id)}
                    onChange={() => toggleCheck(check.id)}
                  />
                  <span>{check.label}</span>
                </label>
              ))}
          </fieldset>
        ))}
      </div>

      <div className="project-review-notes">
        <label>
          What did you build, and why did you make one key choice?
          <textarea
            rows={4}
            maxLength={1200}
            placeholder="Describe the main user flow and a decision you can explain in a code review."
            value={review.explanation}
            onChange={(event) => save({ explanation: event.target.value })}
          />
        </label>
        <label>
          What would you improve next? <span>(optional)</span>
          <textarea
            rows={2}
            maxLength={500}
            placeholder="Name one useful next improvement."
            value={review.nextStep}
            onChange={(event) => save({ nextStep: event.target.value })}
          />
        </label>
      </div>

      <div className="project-review-result" role="status">
        <span className="eyebrow">
          {complete
            ? "PROJECT COMPLETE"
            : readiness.ready
              ? "READY TO SHARE"
              : "NEXT STEP"}
        </span>
        <p>
          {complete && !readiness.ready
            ? "Your earlier completion is preserved. Add evidence when you are ready to share this project."
            : readiness.nextAction}
        </p>
      </div>
      <div className="project-review-actions">
        <button
          className="button button-secondary"
          type="button"
          onClick={downloadReview}
        >
          Download review summary ↓
        </button>
        <button
          className={`button button-primary ${complete ? "button-done" : ""}`}
          type="button"
          aria-pressed={complete}
          disabled={!complete && !readiness.ready}
          onClick={() => toggleProgress("projects", project.slug)}
        >
          {complete ? "✓ Project complete" : "Mark project complete"}
        </button>
      </div>
      <p className="project-review-disclaimer">
        Checks are self-reported. This workspace does not inspect or grade your
        code automatically. Ask a person to review the exported summary and
        working demo.
      </p>
      <p className="project-review-save-status" role="status">
        {status}
      </p>
    </section>
  );
}
