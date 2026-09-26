import type { Metadata } from "next";
import Link from "next/link";
import { levels, lessons } from "@/lib/curriculum";
import { LevelProgress, ProgressSummary } from "@/components/progress";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "Twelve levels from web foundations through software architecture.",
};

export default function CurriculumPage() {
  return (
    <div className="shell page-wrap">
      <div className="page-intro">
        <span className="eyebrow">THE COMPLETE PATH / 00—11</span>
        <h1>
          Learn the stack.
          <br />
          <em>Understand the system.</em>
        </h1>
        <p>
          Twelve connected levels. Start at the first idea you cannot explain,
          then build the project attached to it. Each lesson is a focused
          starting point, not a substitute for practice.
        </p>
        <div className="page-meta">
          <span>{levels.length} levels</span>
          <span>{lessons.length} focused lessons</span>
          <span>5 project briefs</span>
          <span>Open-source track</span>
        </div>
      </div>
      <div className="curriculum-layout">
        <div className="curriculum-main">
          <div className="path-intro">
            <span className="eyebrow">CURRICULUM MAP</span>
            <p>
              Every level has a checkpoint. If you can build and explain it
              without notes, move forward.
            </p>
          </div>
          <div className="curriculum-list">
            {levels.map((level, index) => (
              <section
                id={level.slug}
                className="curriculum-level"
                key={level.slug}
                aria-labelledby={`${level.slug}-title`}
              >
                <div className="level-rail">
                  <span>{level.number}</span>
                  {index < levels.length - 1 && <i aria-hidden="true" />}
                </div>
                <div className="level-body">
                  <div className="level-head">
                    <div>
                      <span className="eyebrow">
                        LEVEL {level.number} · {level.difficulty}
                      </span>
                      <h2 id={`${level.slug}-title`}>{level.title}</h2>
                      <p>{level.description}</p>
                    </div>
                    <LevelProgress
                      ids={level.lessons.map((lesson) => lesson.id)}
                    />
                  </div>
                  <div
                    className="topic-list"
                    aria-label={`${level.title} topics`}
                  >
                    {level.topics.map((topic) => (
                      <span key={topic}>{topic}</span>
                    ))}
                  </div>
                  <div className="level-lessons">
                    {level.lessons.map((lesson) => (
                      <Link
                        href={`/learn/${level.slug}/${lesson.slug}`}
                        key={lesson.id}
                      >
                        <span>LESSON 01</span>
                        <strong>{lesson.title}</strong>
                        <small>{lesson.readingMinutes} min read</small>
                        <b aria-hidden="true">↗</b>
                      </Link>
                    ))}
                  </div>
                  <div className="checkpoint">
                    <strong>Checkpoint</strong>
                    <p>{level.checkpoint}</p>
                    {level.project && (
                      <Link href={`/projects/${level.project}`}>
                        Related project ↗
                      </Link>
                    )}
                  </div>
                  {index === 0 && (
                    <div className="curriculum-os-bridge">
                      <span className="eyebrow">
                        GO DEEPER / GIT & OPEN SOURCE
                      </span>
                      <h3>Learn how work becomes a contribution.</h3>
                      <p>
                        Start Git here, then return to branches, pull requests,
                        reviews, CI, and releases as your projects grow.
                      </p>
                      <Link href="/open-source">
                        Explore the Open Source track ↗
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
        <aside className="curriculum-aside">
          <ProgressSummary total={lessons.length} />
          <div className="aside-note">
            <span className="eyebrow">HOW TO USE THIS</span>
            <ol>
              <li>Read one focused lesson.</li>
              <li>Do its practice task before looking up an answer.</li>
              <li>Apply the idea in a project.</li>
              <li>Explain the result and its tradeoffs.</li>
            </ol>
          </div>
          <Link className="text-link" href="/projects">
            Browse project briefs →
          </Link>
        </aside>
      </div>
    </div>
  );
}
