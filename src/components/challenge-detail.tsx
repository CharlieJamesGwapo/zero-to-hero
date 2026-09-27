import Link from "next/link";
import { type Challenge, type Quest } from "@/lib/challenges";
import { languages } from "@/lib/playground";
import { CodeWorkbench } from "./code-workbench";
import { SelfCheck } from "./self-check";
import { QuestProgress } from "./quest-progress";

export function ChallengeDetail({
  item,
  kind,
}: {
  item: Challenge | Quest;
  kind: "quests" | "exercises";
}) {
  const isQuest = "number" in item;
  const label = item.language === "sql" ? "SQL" : languages[item.language].name;
  const inlineChecks = item.tests.length > 0 && !item.mode;
  return (
    <div className="shell challenge-detail">
      <Link className="sidebar-back" href={`/${kind}`}>
        ← All {kind}
      </Link>
      <div className="challenge-head">
        <span className="eyebrow">
          {isQuest
            ? `QUEST ${item.number} / ${item.category}`
            : `${item.topic.toUpperCase()} / EXERCISE`}
        </span>
        <h1>{item.title}</h1>
        <p>{item.objective}</p>
        <div className="challenge-card-meta">
          <span>{label}</span>
          <span>{item.difficulty}</span>
          <span>{item.minutes} min</span>
        </div>
        {isQuest && <QuestProgress current={item.slug} />}
      </div>
      <div className="challenge-detail-grid">
        <div>
          <section className="challenge-instructions">
            <h2>What you’ll do</h2>
            <ol>
              {item.instructions.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          {isQuest && (
            <section className="challenge-instructions">
              <h2>Before you start</h2>
              <p>{item.prerequisites.join(" · ")}</p>
              <h3>Concepts you’ll demonstrate</h3>
              <p>{item.concepts.join(" · ")}</p>
            </section>
          )}
          <section className="challenge-instructions">
            <h2>Need a hint?</h2>
            {item.hints.map((hint, index) => (
              <details key={hint}>
                <summary>Hint {index + 1}</summary>
                <p>{hint}</p>
              </details>
            ))}
          </section>
          <section className="challenge-instructions">
            <h2>Keep learning</h2>
            <Link className="text-link" href={item.relatedLesson.href}>
              {item.relatedLesson.label} ↗
            </Link>
            {isQuest && item.nextQuest && (
              <p>
                <Link className="text-link" href={`/quests/${item.nextQuest}`}>
                  Next quest →
                </Link>
              </p>
            )}
          </section>
        </div>
        <div>
          {item.mode === "project" ||
          item.language === "sql" ||
          item.language === "cpp" ? (
            <div className="project-challenge">
              <div className="workbench-bar">STARTER / {label}</div>
              <pre>
                <code>{item.starter}</code>
              </pre>
              <p>
                {item.mode === "project"
                  ? "Build this in your own project. Mark it complete after you test the result."
                  : `Run this ${label} code in your local development environment, then check the result.`}
              </p>
              {item.projectHref && (
                <Link className="text-link" href={item.projectHref}>
                  Open project brief ↗
                </Link>
              )}
              <div className="project-check">
                <SelfCheck kind={kind} id={item.slug} />
              </div>
              <details className="reference-solution">
                <summary>View review guide</summary>
                <pre>
                  <code>{item.solution}</code>
                </pre>
                <p>{item.explanation}</p>
              </details>
            </div>
          ) : (
            <>
              <CodeWorkbench
                language={item.language}
                starter={item.starter}
                draftId={`${kind}:${item.slug}`}
                tests={inlineChecks ? item.tests : undefined}
                completion={inlineChecks ? { kind, id: item.slug } : undefined}
                solution={item.solution}
                explanation={item.explanation}
              />
              {!inlineChecks && (
                <div className="project-check">
                  <p>
                    Check the rendered structure yourself before marking this
                    visual exercise complete.
                  </p>
                  <SelfCheck kind={kind} id={item.slug} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
