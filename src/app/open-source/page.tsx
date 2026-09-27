import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  OpenSourceChecklist,
  OpenSourceJourney,
  OpenSourceProgress,
} from "@/components/progress";
import {
  openSourceLessons,
  openSourceStages,
  openSourceWorkflow,
} from "@/lib/open-source";

export const metadata: Metadata = {
  title: "Open Source Development",
  description:
    "Learn Git, GitHub, pull requests, review, CI, licenses, and how to make a real contribution.",
};

const exercise = [
  {
    title: "Create a folder",
    command: "mkdir my-first-repo && cd my-first-repo",
  },
  { title: "Initialize Git", command: "git init" },
  {
    title: "Create a README",
    command: "printf '# My first repository\\n' > README.md",
  },
  { title: "Check the working tree", command: "git status" },
  { title: "Stage the file", command: "git add README.md" },
  { title: "Commit the change", command: 'git commit -m "Add first README"' },
  { title: "Inspect history", command: "git log --oneline -1" },
];

export default function OpenSourcePage() {
  return (
    <div className="os-page">
      <section className="os-hero">
        <div className="shell os-hero-grid">
          <div>
            <span className="eyebrow">LEARN / BUILD / CONTRIBUTE</span>
            <h1>
              Open Source
              <br />
              <em>Development.</em>
            </h1>
            <p className="os-hero-subtitle">
              Learn how real developers collaborate on software in public.
            </p>
            <p>
              Open source is more than publishing code. It is a way of
              designing, building, reviewing, releasing, and maintaining
              software with other people.
            </p>
            <div className="hero-actions">
              <Link
                className="button button-primary"
                href="/open-source/git/what-is-git"
              >
                Start with Git ↗
              </Link>
              <Link
                className="button button-secondary"
                href="/quests/first-contribution"
              >
                Take the contribution quest →
              </Link>
            </div>
            <div className="hero-proof">
              <span>{openSourceLessons.length} focused lessons</span>
              <span>No account required</span>
              <span>Real repository</span>
            </div>
          </div>
          <div className="os-hero-art">
            <Image
              src="/logo.png"
              alt="ZERO → HERO logo with an upward blue arrow and Learn. Build. Ship. tagline"
              width={330}
              height={330}
              priority
            />
            <div className="os-branch" aria-hidden="true">
              <span>main ────────────┐</span>
              <span> feature/docs ──●</span>
              <span> fix/mobile ─────●</span>
              <span> PR → CI → merge</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell" aria-labelledby="os-path-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 — THE COLLABORATION PATH</span>
            <h2 id="os-path-title">
              Learn the parts in the order you use them.
            </h2>
          </div>
          <p>
            Start locally with Git. Add GitHub, then practice how a change
            becomes a reviewed contribution.
          </p>
        </div>
        <div className="os-path-layout">
          <ol className="os-stages">
            {openSourceStages.map((stage, index) => (
              <li key={stage.path}>
                <Link href={stage.path}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{stage.title}</strong>
                  <span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ol>
          <aside className="os-path-aside">
            <OpenSourceProgress />
            <OpenSourceJourney />
            <div className="aside-note">
              <span className="eyebrow">START SMALL</span>
              <p>
                Your first PR can fix one sentence. The whole path still teaches
                branches, checks, review, and release decisions.
              </p>
              <Link href="/open-source/good-first-issues" className="text-link">
                Find a first issue →
              </Link>
            </div>
            <Link href="/open-source/git/commands" className="text-link">
              Git command reference →
            </Link>
          </aside>
        </div>
      </section>

      <section
        className="section section-tinted"
        aria-labelledby="git-exercise-title"
      >
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 — GUIDED EXERCISE</span>
              <h2 id="git-exercise-title">Your first repository.</h2>
            </div>
            <p>
              Create a local history you can inspect. Run each command yourself;
              the page does not execute code on your device.
            </p>
          </div>
          <div className="os-exercise">
            <div>
              <span className="eyebrow">GOAL</span>
              <h3>Make a first commit.</h3>
              <p>
                Use a new folder that does not contain personal files. After the
                last step, `git log --oneline -1` should show one commit and
                `git status` should report a clean working tree.
              </p>
              <div className="os-callout">
                <strong>What you learned</strong>
                <p>
                  You moved a file from working tree to stage to commit. Git now
                  has a local record even before you create a GitHub repository.
                </p>
              </div>
              <div className="os-callout">
                <strong>Common mistakes</strong>
                <p>
                  Running `git init` in the wrong folder, forgetting to stage
                  the README, or assuming the commit is already on GitHub. If
                  Git asks for an author, configure your own name and email.
                </p>
              </div>
            </div>
            <ol>
              {exercise.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <code>{step.command}</code>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section shell" aria-labelledby="workflow-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 — FOLLOW A REAL CHANGE</span>
            <h2 id="workflow-title">From idea to maintained software.</h2>
          </div>
          <p>
            Each step opens the lesson that explains its responsibility. A merge
            is a beginning of release and maintenance work, not the end of it.
          </p>
        </div>
        <div
          className="os-workflow"
          aria-label="Clickable open-source project workflow"
        >
          {openSourceWorkflow.map((step, index) => (
            <Link href={step.path} key={`${step.title}-${index}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <small>{step.detail}</small>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="section section-tinted"
        aria-labelledby="contribute-title"
      >
        <div className="shell os-contribute-grid">
          <div>
            <span className="eyebrow">04 — LEARN BY CONTRIBUTING</span>
            <h2 id="contribute-title">
              You don’t have to be an expert to contribute.
            </h2>
            <p>
              Fix a typo, clarify an explanation, add an example, repair a link,
              improve accessibility, add a test, translate content, or define a
              glossary term. Work with a real issue and an actual review.
            </p>
            <div className="hero-actions">
              <Link
                className="button button-primary"
                href="/open-source/first-contribution"
              >
                Make your first contribution ↗
              </Link>
              <Link
                className="button button-secondary"
                href="/open-source/project"
              >
                Explore the project →
              </Link>
            </div>
          </div>
          <OpenSourceChecklist />
        </div>
      </section>
    </div>
  );
}
