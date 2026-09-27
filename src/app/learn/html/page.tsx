import type { Metadata } from "next";
import Link from "next/link";
import { levels } from "@/lib/curriculum";
import { HtmlModuleProgress } from "@/components/html-module-progress";

export const metadata: Metadata = {
  title: "Guided HTML module",
  description:
    "Learn HTML through four lessons and a hands-on portfolio workshop.",
};
const html = levels.find((level) => level.slug === "html")!;

export default function HtmlModulePage() {
  return (
    <div className="shell page-wrap">
      <div className="page-intro">
        <span className="eyebrow">BEGINNER MODULE / HTML</span>
        <h1>
          Write a page that <em>means something.</em>
        </h1>
        <p>
          Four focused lessons. One portfolio document you build as you go.
          Read, edit, check, and explain each decision.
        </p>
        <div className="hero-actions">
          <Link
            className="button button-primary"
            href="/learn/html/first-document"
          >
            Start lesson one ↗
          </Link>
          <Link className="button button-secondary" href="/learn/html/workshop">
            Open the workshop →
          </Link>
        </div>
      </div>
      <HtmlModuleProgress />
      <div className="module-grid">
        {html.lessons.map((lesson, index) => (
          <article className="module-card" key={lesson.id}>
            <span className="eyebrow">
              LESSON {String(index + 1).padStart(2, "0")}
            </span>
            <h2>{lesson.title}</h2>
            <p>{lesson.summary}</p>
            <Link className="text-link" href={`/learn/html/${lesson.slug}`}>
              Read and practice ↗
            </Link>
          </article>
        ))}
      </div>
      <section className="module-finish">
        <span className="eyebrow">BUILD OUTCOME</span>
        <h2>A portfolio page you can explain.</h2>
        <p>
          Write your own content, complete the workshop checks, review it with a
          keyboard, and download the HTML file. You can then add CSS in the next
          level.
        </p>
        <Link className="text-link" href="/resources?topic=HTML">
          Explore free HTML references and videos ↗
        </Link>
      </section>
    </div>
  );
}
