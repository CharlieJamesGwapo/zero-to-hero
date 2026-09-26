import type { Metadata } from "next";
import Link from "next/link";
import { glossary } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Clear definitions for the terms used throughout the web development curriculum.",
};
export default function GlossaryPage() {
  const terms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <div className="shell page-wrap">
      <div className="page-intro">
        <span className="eyebrow">REFERENCE / {terms.length} TERMS</span>
        <h1>
          Words you can
          <br />
          <em>put to work.</em>
        </h1>
        <p>
          A short definition, the detail behind it, and a lesson where the term
          matters in real code.
        </p>
      </div>
      <nav className="glossary-index" aria-label="Glossary terms">
        {terms.map((item) => (
          <a key={item.slug} href={`#${item.slug}`}>
            {item.term}
          </a>
        ))}
      </nav>
      <div className="glossary-list">
        {terms.map((item) => (
          <section key={item.slug} id={item.slug} className="glossary-entry">
            <h2>{item.term}</h2>
            <div>
              <p className="glossary-definition">{item.definition}</p>
              <p>{item.detail}</p>
              <Link href={item.lesson} className="text-link">
                Read related lesson →
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
