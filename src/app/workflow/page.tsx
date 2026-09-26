import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How software gets built",
  description:
    "A practical software development workflow from requirement to monitored release.",
};
const stages = [
  [
    "01",
    "Idea",
    "Name the problem and the person who has it. A feature request is a hypothesis until you understand the job.",
  ],
  [
    "02",
    "Requirements",
    "Write observable behavior, constraints, and failure rules. Replace vague words with examples.",
  ],
  [
    "03",
    "User flows",
    "Map the steps a person takes to finish the task, including empty, invalid, and interrupted paths.",
  ],
  [
    "04",
    "UI design",
    "Arrange content and controls so the task is clear. Check keyboard and narrow-screen behavior early.",
  ],
  [
    "05",
    "Architecture",
    "Draw the request path and decide which layer owns each rule.",
  ],
  [
    "06",
    "Database design",
    "Model the facts the product must keep and the constraints it must enforce.",
  ],
  [
    "07",
    "Implementation",
    "Build a thin, working slice through the system before expanding the feature.",
  ],
  [
    "08",
    "Testing",
    "Verify the main flow, rejection paths, and boundaries that protect users or money.",
  ],
  [
    "09",
    "Code review",
    "Ask whether the change is clear, correct, secure, and maintainable by someone else.",
  ],
  [
    "10",
    "Pull request",
    "Describe intent, evidence, risk, screenshots, and a way for a reviewer to try the change.",
  ],
  [
    "11",
    "CI",
    "Run repeatable lint, type, test, and build checks on the proposed revision.",
  ],
  [
    "12",
    "Deployment",
    "Release a known revision with environment settings, migration order, and rollback plan.",
  ],
  [
    "13",
    "Monitoring",
    "Watch errors, latency, and the user action the change was meant to improve.",
  ],
  [
    "14",
    "Iteration",
    "Use feedback and production evidence to decide the next small change.",
  ],
] as const;
const git = [
  [
    "Issue",
    "Capture a problem with enough context to reproduce or evaluate it.",
  ],
  ["Branch", "Isolate one small change from the default branch."],
  ["Implementation", "Make the change and run the relevant checks locally."],
  [
    "Commit",
    "Record a coherent revision with a message that explains the change.",
  ],
  ["Pull request", "Show the change, why it matters, and how it was verified."],
  [
    "Review",
    "Resolve questions and improve the change while context is fresh.",
  ],
  ["Merge", "Integrate only after the checks and review required by the team."],
  ["Deploy", "Promote the tested revision and verify the main flow."],
] as const;
export default function WorkflowPage() {
  return (
    <div className="shell page-wrap">
      <div className="page-intro">
        <span className="eyebrow">ENGINEERING HANDBOOK / WORKFLOW</span>
        <h1>
          How software
          <br />
          <em>actually gets built.</em>
        </h1>
        <p>
          A feature moves through decisions, code, review, release, and
          feedback. Knowing the steps helps you build a smaller, safer first
          version.
        </p>
      </div>
      <div className="workflow-layout">
        <div>
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">THE PRODUCT LOOP</span>
              <h2>From problem to evidence.</h2>
            </div>
          </div>
          <ol className="workflow-list">
            {stages.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="workflow-aside">
          <span className="eyebrow">THE GIT DELIVERY LOOP</span>
          <h2>One change, one traceable path.</h2>
          <ol>
            {git.map(([title, description], i) => (
              <li key={title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href="/learn/devops/from-pr-to-production"
            className="text-link"
          >
            Study release engineering →
          </Link>
        </aside>
      </div>
    </div>
  );
}
