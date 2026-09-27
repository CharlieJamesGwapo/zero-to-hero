"use client";

import Link from "next/link";
import { learningPaths, nextLearningStep } from "@/lib/learning-paths";
import { lessons } from "@/lib/curriculum";
import { openSourceLessons } from "@/lib/open-source";
import { quests, exercises } from "@/lib/challenges";
import { projects } from "@/lib/projects";
import { tracks } from "../../content/tracks/paths";
import { toggleProgress, useProgress } from "./progress";

function pathIds(slug: string) {
  if (slug === "web") return lessons.map((item) => item.id);
  if (slug === "open-source")
    return openSourceLessons.map((item) => item.path.slice(1));
  const track = tracks.find((item) => item.slug === slug);
  return track?.stages.map((item) => `track/${slug}/${item.slug}`) ?? [];
}

export function LearnDashboard() {
  const progress = useProgress();
  const selected = progress.tracks
    .map((slug) => learningPaths.find((path) => path.slug === slug))
    .filter((path) => path !== undefined);
  const nextStep = selected.length
    ? selected
        .map((path) => nextLearningStep(path.slug, progress.completed))
        .find((step) => step !== null)
    : nextLearningStep("fundamentals", progress.completed);
  const activeQuest = quests.find(
    (quest) => !progress.quests.includes(quest.slug),
  );
  const activeExercise = exercises.find(
    (exercise) => !progress.exercises.includes(exercise.slug),
  );
  const saved = progress.bookmarks
    .map((id) => {
      const web = lessons.find((item) => item.id === id);
      if (web)
        return {
          id,
          title: web.title,
          href: `/learn/${web.levelSlug}/${web.slug}`,
        };
      const [, trackSlug, stageSlug] = id.split("/");
      const stage = tracks
        .find((item) => item.slug === trackSlug)
        ?.stages.find((item) => item.slug === stageSlug);
      return stage
        ? { id, title: stage.title, href: `/tracks/${trackSlug}/${stageSlug}` }
        : undefined;
    })
    .filter((item) => item !== undefined);
  const recentExercises = progress.exercises
    .slice(-3)
    .reverse()
    .map((slug) => exercises.find((item) => item.slug === slug))
    .filter((item) => item !== undefined);
  return (
    <>
      <section className="dashboard-start">
        <div className="dashboard-start-copy">
          <span className="eyebrow">CONTINUE LEARNING</span>
          <h2>
            {nextStep
              ? selected.length
                ? "Pick up where you left off."
                : "Start from absolute zero."
              : "You finished your selected paths."}
          </h2>
          <p>
            {nextStep
              ? selected.length
                ? "Your progress is saved in this browser. Continue with your next unfinished step."
                : "No account or setup is required. Start with a program, then take a small practice step."
              : "Explore another path or revisit a lesson to keep building."}
          </p>
          <div className="hero-actions">
            <Link
              className="button button-primary"
              href={nextStep?.href ?? "/curriculum"}
            >
              {nextStep ? "Continue learning ↗" : "Explore more paths ↗"}
            </Link>
            <Link className="button button-secondary" href="/playground">
              Try the playground →
            </Link>
          </div>
        </div>
        <div className="dashboard-next-card">
          <span className="dashboard-next-label">
            {nextStep ? "YOUR NEXT STEP" : "KEEP BUILDING"}
          </span>
          <span className="dashboard-next-path">
            {nextStep?.pathTitle ?? "Explore the curriculum"}
          </span>
          <strong>{nextStep?.title ?? "Choose a new direction"}</strong>
          <span className="dashboard-next-foot">
            {nextStep ? "Learn · practice · build" : "New lessons await"}
          </span>
        </div>
      </section>
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR PATHS</span>
            <h2>What do you want to learn?</h2>
          </div>
          <p>
            Select more than one. Your choices are stored only on this device.
          </p>
        </div>
        <div className="path-grid">
          {learningPaths.map((path) => {
            const ids = pathIds(path.slug);
            const count = ids.filter((id) =>
              progress.completed.includes(id),
            ).length;
            const percent = ids.length
              ? Math.round((count / ids.length) * 100)
              : 0;
            const chosen = progress.tracks.includes(path.slug);
            return (
              <article className="path-card" key={path.slug}>
                <div className="path-card-top">
                  <span className="eyebrow">{path.label}</span>
                  <button
                    type="button"
                    aria-pressed={chosen}
                    aria-label={`${chosen ? "Remove" : "Add"} ${path.title} ${chosen ? "from" : "to"} my paths`}
                    onClick={() => toggleProgress("tracks", path.slug)}
                  >
                    {chosen ? "✓ Selected" : "+ Add path"}
                  </button>
                </div>
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <div className="progress-track">
                  <span style={{ width: `${percent}%` }} />
                </div>
                <small>
                  {count} / {ids.length} complete
                </small>
                <Link className="text-link" href={path.href}>
                  Explore path ↗
                </Link>
              </article>
            );
          })}
        </div>
      </section>
      <section className="dashboard-section dashboard-panels">
        <div>
          <span className="eyebrow">PRACTICE</span>
          <h2>Next small step</h2>
          <p>
            {activeQuest
              ? activeQuest.objective
              : "You completed every quest in the current set."}
          </p>
          {activeQuest && (
            <Link className="text-link" href={`/quests/${activeQuest.slug}`}>
              Quest {activeQuest.number}: {activeQuest.title} ↗
            </Link>
          )}
          <p className="dashboard-muted">
            {progress.quests.length} / {quests.length} quests complete ·{" "}
            {progress.exercises.length} / {exercises.length} exercises complete
          </p>
          {activeExercise ? (
            <Link
              className="text-link"
              href={`/exercises/${activeExercise.slug}`}
            >
              Next exercise: {activeExercise.title} ↗
            </Link>
          ) : (
            <p>All current exercises complete.</p>
          )}
          {recentExercises.length > 0 && (
            <div className="dashboard-recent">
              <strong>Completed exercises</strong>
              {recentExercises.map((item) => (
                <Link href={`/exercises/${item.slug}`} key={item.slug}>
                  {item.title} ↗
                </Link>
              ))}
            </div>
          )}
        </div>
        <div>
          <span className="eyebrow">SAVED LESSONS</span>
          <h2>Read again</h2>
          {saved.length ? (
            <ul>
              {saved.slice(-3).map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>{item.title} ↗</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Bookmark a lesson to keep it here.</p>
          )}
          <Link className="text-link" href="/curriculum">
            Browse curriculum ↗
          </Link>
        </div>
        <div>
          <span className="eyebrow">PROJECTS</span>
          <h2>Build something real</h2>
          <p>
            {progress.projects.length} / {projects.length} project briefs marked
            complete.
          </p>
          <Link className="text-link" href="/projects">
            Explore projects ↗
          </Link>
        </div>
      </section>
    </>
  );
}
