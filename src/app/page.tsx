import Link from "next/link";
import Image from "next/image";
import { levels, lessons } from "@/lib/curriculum";
import { projects } from "@/lib/projects";
import { StartChooser } from "@/components/start-chooser";
import { ProgressSummary } from "@/components/progress";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow eyebrow-rule">
              <span className="status-dot" /> OPEN-SOURCE DEVELOPMENT PATH{" "}
              <span>· 2026</span>
            </div>
            <h1>
              Build software
              <br />
              <em>you can explain.</em>
            </h1>
            <p className="hero-lead">
              From the first request a browser makes to the systems behind a
              production release. Learn the concept, build the feature, break
              it, debug it, and ship it.
            </p>
            <div className="hero-actions">
              <Link
                className="button button-primary"
                href="/learn/foundations/how-the-web-works"
              >
                Start from zero <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button button-secondary" href="/curriculum">
                Explore curriculum <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="hero-proof">
              <span>{levels.length} levels</span>
              <span>{lessons.length} focused lessons</span>
              <span>{projects.length} projects</span>
              <span>No account required</span>
            </div>
          </div>
          <div
            className="hero-panel"
            aria-label="The learning path from idea to release"
          >
            <div className="panel-top">
              <span>THE PRACTICAL LOOP</span>
              <span>01 / 07</span>
            </div>
            <div className="loop-steps">
              {[
                "Learn",
                "Understand",
                "Build",
                "Break",
                "Debug",
                "Ship",
                "Repeat",
              ].map((step, index) => (
                <div
                  key={step}
                  className={index === 5 ? "loop-step active" : "loop-step"}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                  <span aria-hidden="true">↘</span>
                </div>
              ))}
            </div>
            <div className="panel-bottom">
              <span>ENGINEERING IS A PRACTICE, NOT A PLAYLIST.</span>
              <span className="panel-cursor">_</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell" aria-labelledby="path-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 — THE PATH</span>
            <h2 id="path-title">A curriculum with a reason for every step.</h2>
          </div>
          <p>
            Each level begins with a problem, ends with something working, and
            connects to the next part of the stack.
          </p>
        </div>
        <div className="level-preview">
          {levels.slice(0, 6).map((level) => (
            <Link
              key={level.slug}
              href={`/learn/${level.slug}/${level.lessons[0].slug}`}
              className="preview-row"
            >
              <span className="preview-number">{level.number}</span>
              <span>
                <strong>{level.title}</strong>
                <small>{level.short}</small>
              </span>
              <span className="preview-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
        <div className="section-tail">
          <p>
            The path continues through Next.js, backend systems, databases,
            production engineering, DevOps, and architecture.
          </p>
          <Link href="/curriculum" className="text-link">
            See the complete map <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 — BUILD</span>
              <h2>Projects make the concepts real.</h2>
            </div>
            <p>
              Five briefs increase in scope. The deliverable is working software
              and an explanation of its tradeoffs.
            </p>
          </div>
          <div className="project-preview-grid">
            {projects.slice(0, 3).map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="project-preview"
              >
                <span className="project-index">
                  PROJECT / {project.number}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <span className="card-link">
                  Open brief <span aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
          <Link href="/projects" className="text-link project-all">
            Explore all projects <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="section shell home-contribute">
        <div>
          <span className="eyebrow">03 — CONTRIBUTE</span>
          <h2>Learn software by working on software.</h2>
          <p>
            You don’t need to wait until you’re an expert. Learn Git, open an
            issue, make a small change, submit a pull request, get feedback, and
            ship it.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/open-source">
              Learn open source ↗
            </Link>
            <Link
              className="button button-secondary"
              href="/open-source/project"
            >
              Contribute to ZERO → HERO →
            </Link>
          </div>
        </div>
        <div className="home-contribute-art">
          <Image
            src="/zero-to-hero-logo.png"
            alt="ZERO → HERO logo"
            width={205}
            height={205}
          />
          <div>
            <span>ISSUE</span>
            <span>BRANCH</span>
            <span>COMMIT</span>
            <span>REVIEW</span>
            <span>MERGE</span>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="split-feature">
          <div>
            <span className="eyebrow">04 — UNDERSTAND THE SYSTEM</span>
            <h2>Know what happens between a click and a database write.</h2>
            <p>
              Architecture should be readable. Follow a request through the
              browser, API, service, and database, then learn why each boundary
              exists.
            </p>
            <Link href="/architecture" className="text-link">
              Explore architecture <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div
            className="stack-diagram"
            aria-label="Browser to database architecture"
          >
            <span>BROWSER</span>
            <i>↓</i>
            <span>APPLICATION</span>
            <i>↓</i>
            <span>API + SERVICES</span>
            <i>↓</i>
            <span>DATABASE</span>
          </div>
        </div>
      </section>

      <div className="shell">
        <StartChooser />
      </div>

      <section className="section section-tinted">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                OPEN SOURCE IS PART OF THE CURRICULUM
              </span>
              <h2>Learn it on the project you’re learning from.</h2>
            </div>
            <p>
              Practice real collaboration with lessons, projects, and a public
              repository. Progress stays in your browser.
            </p>
          </div>
          <div className="open-source-cards">
            <Link href="/open-source">
              <span>LEARN / 01</span>
              <h3>Understand the workflow.</h3>
              <p>
                Git, GitHub, issues, branches, pull requests, reviews, and
                releases.
              </p>
              <strong>Start tutorial ↗</strong>
            </Link>
            <Link href="/projects">
              <span>BUILD / 02</span>
              <h3>Use it in projects.</h3>
              <p>
                Work through project briefs with testing, review, and deployment
                decisions.
              </p>
              <strong>Explore projects ↗</strong>
            </Link>
            <Link href="/open-source/project">
              <span>CONTRIBUTE / 03</span>
              <h3>Improve this project.</h3>
              <p>
                Fix documentation, improve lessons, solve issues, and submit a
                PR.
              </p>
              <strong>Make a contribution ↗</strong>
            </Link>
          </div>
          <div className="home-progress">
            <ProgressSummary total={lessons.length} />
          </div>
        </div>
      </section>
    </>
  );
}
