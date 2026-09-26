import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { ProjectAction } from "@/components/progress";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project?.title ?? "Project",
    description: project?.description,
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[index + 1];
  return (
    <div className="shell page-wrap project-detail">
      <div className="project-detail-header">
        <Link href="/projects" className="sidebar-back">
          ← All projects
        </Link>
        <span className="eyebrow">
          PROJECT {project.number} / {project.level.toUpperCase()}
        </span>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <div className="tag-row">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
      <div className="project-detail-grid">
        <div className="project-detail-main">
          <section className="detail-section">
            <span className="eyebrow">01 / THE BRIEF</span>
            <h2>What must the user be able to do?</h2>
            <p>{project.brief}</p>
          </section>
          <section className="detail-section">
            <span className="eyebrow">02 / REQUIREMENTS</span>
            <h2>Build the real flow.</h2>
            <ul className="check-list">
              {project.requirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </section>
          <section className="detail-section">
            <span className="eyebrow">03 / MILESTONES</span>
            <h2>Ship in slices.</h2>
            <ol className="number-list">
              {project.milestones.map((milestone, i) => (
                <li key={milestone}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {milestone}
                </li>
              ))}
            </ol>
          </section>
          <section className="detail-section">
            <span className="eyebrow">04 / REVIEW</span>
            <h2>Questions before you call it done.</h2>
            <ul className="check-list">
              {project.review.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </section>
          {slug === "saas" && <CapstoneTemplates />}
          {next && (
            <Link className="next-project" href={`/projects/${next.slug}`}>
              <span>UP NEXT / PROJECT {next.number}</span>
              <strong>{next.title}</strong>
              <b aria-hidden="true">↗</b>
            </Link>
          )}
          <div className="project-completion">
            <span className="eyebrow">READY TO MOVE ON?</span>
            <p>
              Complete the review questions and verify the main flow before
              recording this project as done.
            </p>
            <ProjectAction id={project.slug} />
          </div>
        </div>
        <aside className="project-detail-aside">
          <div className="aside-note">
            <span className="eyebrow">DEFINITION OF DONE</span>
            <p>
              A working primary flow, tested failure paths, a live demo, source
              code, and an explanation of the main engineering choices.
            </p>
          </div>
          <Link className="text-link" href="/workflow">
            Follow the workflow →
          </Link>
        </aside>
      </div>
    </div>
  );
}

function CapstoneTemplates() {
  const templates = [
    {
      title: "Requirements",
      items: [
        "Who is the user and what task must they finish?",
        "What is the smallest useful release?",
        "What must never happen?",
        "What does success look like?",
      ],
    },
    {
      title: "Architecture",
      items: [
        "Draw the request path from browser to data store.",
        "Name each boundary and its responsibility.",
        "Identify external services and failure points.",
        "Record why each component is needed now.",
      ],
    },
    {
      title: "Database design",
      items: [
        "List entities, keys, and relationships.",
        "Write constraints that protect product rules.",
        "Describe one important query and its expected volume.",
        "Plan migrations and seed data.",
      ],
    },
    {
      title: "Git and pull request",
      items: [
        "Link an issue to a small branch.",
        "Explain the change and include screenshots where useful.",
        "List the tests run and the risks reviewed.",
        "Get review, merge after checks, and record the release.",
      ],
    },
    {
      title: "Deployment and production",
      items: [
        "Set secrets in the hosting environment.",
        "Run the production build and database migration plan.",
        "Check the main flow in a preview and after deployment.",
        "Set up logs, alerts, ownership, and a rollback path.",
      ],
    },
  ];
  return (
    <section className="detail-section capstone-templates">
      <span className="eyebrow">05 / CAPSTONE TOOLKIT</span>
      <h2>Build a production application.</h2>
      <p>
        Use these prompts as working documents. Copy them into your repository
        and fill them with decisions you can defend.
      </p>
      <div className="template-grid">
        {templates.map((template) => (
          <div key={template.title}>
            <h3>{template.title}</h3>
            <ul>
              {template.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
