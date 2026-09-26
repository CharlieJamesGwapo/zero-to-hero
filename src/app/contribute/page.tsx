import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "How to improve Zero to Hero lessons, projects, architecture guides, and code.",
};
const repository = "https://github.com/CharlieJamesGwapo/zero-to-hero";
export default function ContributePage() {
  return (
    <div className="shell page-wrap">
      <div className="page-intro">
        <span className="eyebrow">
          OPEN SOURCE / EVERYONE CAN IMPROVE THE PATH
        </span>
        <h1>
          Help make it
          <br />
          <em>clearer for the next learner.</em>
        </h1>
        <p>
          Fix a confusing sentence, add a useful example, improve a project
          brief, or make the interface easier to use.
        </p>
        <a
          className="button button-primary"
          href={repository}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub ↗
        </a>
        <Link
          className="button button-secondary contribute-tutorial"
          href="/open-source"
        >
          Learn the open-source workflow →
        </Link>
      </div>
      <div className="contribute-grid">
        <section>
          <span className="eyebrow">01 / FIND A SMALL CHANGE</span>
          <h2>Start with what you noticed.</h2>
          <p>
            Open an issue for a content gap, broken link, accessibility problem,
            or unclear explanation. Include the page, what you expected, and
            what happened.
          </p>
        </section>
        <section>
          <span className="eyebrow">02 / EDIT CONTENT</span>
          <h2>Lessons live in MDX.</h2>
          <p>
            Find a lesson in <code>content/</code>. Keep its focused sections:
            problem, concept, example, how it works, mistakes, practice, build,
            and checkpoint. Test the code examples.
          </p>
        </section>
        <section>
          <span className="eyebrow">03 / IMPROVE A PROJECT</span>
          <h2>Make the brief testable.</h2>
          <p>
            Project data lives in <code>src/lib/projects.ts</code>. Add behavior
            a user can observe, include failure paths, and name how a reviewer
            can verify the result.
          </p>
        </section>
        <section>
          <span className="eyebrow">04 / SHARE YOUR CHANGE</span>
          <h2>Open a clear pull request.</h2>
          <p>
            Run lint, typecheck, tests, and build checks. Describe the change
            and include screenshots for visual work. The repository contains a
            short pull request template.
          </p>
        </section>
      </div>
      <div className="section-tail">
        <p>
          New to Git and pull requests? Practice the full path before making a
          contribution.
        </p>
        <Link className="text-link" href="/open-source/first-contribution">
          Start the first contribution guide →
        </Link>
      </div>
    </div>
  );
}
