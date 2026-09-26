import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Five progressively harder web development project briefs.",
};
export default function ProjectsPage() {
  return (
    <div className="shell page-wrap">
      <div className="page-intro">
        <span className="eyebrow">FIVE PROJECT BRIEFS</span>
        <h1>
          Make it work.
          <br />
          <em>Then make it explainable.</em>
        </h1>
        <p>
          Build progressively from a personal page to an organization-based
          product. Each brief defines what a real user must be able to do and
          how to review the result.
        </p>
      </div>
      <div className="projects-list">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            className="project-row"
            key={project.slug}
          >
            <span className="project-index">
              PROJECT {project.number} / {project.level}
            </span>
            <div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
            <span className="project-row-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </div>
      <div className="section-tail">
        <p>
          A project is complete when the main flow works, failure states are
          honest, and you can explain the code.
        </p>
        <Link className="text-link" href="/workflow">
          How software gets built →
        </Link>
      </div>
    </div>
  );
}
