import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureTrace } from "@/components/architecture-trace";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "See how web applications grow from a browser document to a production system.",
};
const stages = [
  {
    number: "01",
    name: "Beginner",
    reason:
      "A browser can turn a document, styles, and scripts into a useful product without a framework.",
    nodes: [
      {
        label: "Browser",
        href: "/learn/foundations/how-the-web-works",
        note: "Requests and renders",
      },
      {
        label: "HTML",
        href: "/learn/html/semantic-page",
        note: "Meaning and structure",
      },
      {
        label: "CSS",
        href: "/learn/css/layout-with-intent",
        note: "Layout and presentation",
      },
      {
        label: "JavaScript",
        href: "/learn/javascript/state-and-events",
        note: "Behavior and state",
      },
    ],
  },
  {
    number: "02",
    name: "Frontend",
    reason:
      "As interactions grow, components make a UI easier to divide and maintain. The browser still calls an API for shared data.",
    nodes: [
      {
        label: "Browser",
        href: "/learn/foundations/how-the-web-works",
        note: "Runs the interface",
      },
      {
        label: "React",
        href: "/learn/react/owning-state",
        note: "Composes the UI",
      },
      { label: "API", href: "/glossary#api", note: "Exposes data and actions" },
    ],
  },
  {
    number: "03",
    name: "Full-stack",
    reason:
      "The server owns product rules and persistence; the browser owns interaction. Permissions must be checked at the server boundary.",
    nodes: [
      {
        label: "Browser",
        href: "/learn/foundations/how-the-web-works",
        note: "Interaction",
      },
      {
        label: "Next.js",
        href: "/learn/nextjs/server-client-boundary",
        note: "Routes and rendering",
      },
      {
        label: "Backend",
        href: "/learn/backend/request-to-service",
        note: "Validation and rules",
      },
      {
        label: "Database",
        href: "/learn/databases/modeling-data",
        note: "Durable data",
      },
    ],
  },
  {
    number: "04",
    name: "Production",
    reason:
      "Add supporting parts only when traffic, latency, reliability, or work outside a request makes them necessary.",
    nodes: [
      {
        label: "Users",
        href: "/learn/foundations/how-the-web-works",
        note: "The reason the system exists",
      },
      {
        label: "CDN / Edge",
        href: "/glossary#cdn",
        note: "Nearby asset delivery",
      },
      {
        label: "Application",
        href: "/learn/nextjs/server-client-boundary",
        note: "Pages and endpoints",
      },
      {
        label: "API + services",
        href: "/learn/backend/request-to-service",
        note: "Rules and integrations",
      },
      {
        label: "Database",
        href: "/learn/databases/modeling-data",
        note: "Persistent source of truth",
      },
      {
        label: "Cache / queue / storage",
        href: "/learn/architecture/growing-a-system",
        note: "Specialized support",
      },
    ],
  },
];

export default function ArchitecturePage() {
  return (
    <div className="shell page-wrap">
      <div className="page-intro">
        <span className="eyebrow">SYSTEMS / FROM SMALL TO LARGE</span>
        <h1>
          Every box needs
          <br />
          <em>a reason to exist.</em>
        </h1>
        <p>
          Follow the path of a user action. Click a component to learn what it
          does, where its boundary sits, and when it becomes useful.
        </p>
      </div>
      <ArchitectureTrace />
      <div className="architecture-stages">
        {stages.map((stage) => (
          <section className="architecture-stage" key={stage.number}>
            <div className="stage-copy">
              <span className="eyebrow">STAGE {stage.number}</span>
              <h2>{stage.name}</h2>
              <p>{stage.reason}</p>
            </div>
            <div
              className="architecture-nodes"
              aria-label={`${stage.name} architecture`}
            >
              {stage.nodes.map((node, index) => (
                <div className="architecture-node-wrap" key={node.label}>
                  <Link className="architecture-node" href={node.href}>
                    <strong>{node.label}</strong>
                    <small>{node.note}</small>
                    <span aria-hidden="true">↗</span>
                  </Link>
                  {index < stage.nodes.length - 1 && (
                    <span className="architecture-connector" aria-hidden="true">
                      ↓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="section-tail">
        <p>
          The most useful architecture diagram is one you can explain from a
          real user request.
        </p>
        <Link className="text-link" href="/learn/architecture/growing-a-system">
          Read the architecture lesson →
        </Link>
      </div>
    </div>
  );
}
