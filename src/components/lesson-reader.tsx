import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { LessonActions } from "@/components/progress";

export type ReaderLink = { href: string; title: string };
export type ReaderNavItem = ReaderLink & { number: string; current?: boolean };
export type ReaderSection = { id: string; title: string };

type Props = {
  back: ReaderLink;
  breadcrumb: ReaderLink;
  eyebrow: string;
  title: string;
  summary: string;
  id: string;
  content: ComponentType;
  sections: ReaderSection[];
  navigation: ReaderNavItem[];
  previous?: ReaderLink;
  next?: ReaderLink;
  aside?: ReactNode;
};

export function LessonReader({
  back,
  breadcrumb,
  eyebrow,
  title,
  summary,
  id,
  content: Content,
  sections,
  navigation,
  previous,
  next,
  aside,
}: Props) {
  return (
    <div className="shell lesson-layout">
      <aside className="lesson-sidebar" aria-label="Lesson navigation">
        <Link className="sidebar-back" href={back.href}>
          ← {back.title}
        </Link>
        <div className="sidebar-heading">
          THE PATH <span>{navigation.length} STEPS</span>
        </div>
        <nav>
          {navigation.map((item) => (
            <div
              className={
                item.current ? "sidebar-level current" : "sidebar-level"
              }
              key={item.href}
            >
              <Link href={item.href}>
                <span>{item.number}</span>
                {item.title}
              </Link>
            </div>
          ))}
        </nav>
        <details className="mobile-curriculum">
          <summary>
            Browse lessons <span aria-hidden="true">⌄</span>
          </summary>
          <nav>
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.number} / {item.title}
              </Link>
            ))}
          </nav>
        </details>
      </aside>
      <article className="lesson-article">
        <div className="lesson-breadcrumb">
          <Link href={back.href}>{back.title}</Link>
          <span>/</span>
          <Link href={breadcrumb.href}>{breadcrumb.title}</Link>
        </div>
        <header className="lesson-header">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{summary}</p>
        </header>
        <div className="lesson-content">
          <Content />
        </div>
        <div className="lesson-finish">
          <div>
            <span className="eyebrow">KEEP THE LOOP MOVING</span>
            <h2>Build it. Explain it. Then continue.</h2>
            <p>
              Mark this lesson complete when you can use its idea in your own
              work and explain why it matters.
            </p>
          </div>
          <LessonActions id={id} />
        </div>
        <nav className="lesson-pagination" aria-label="Lesson navigation">
          {previous ? (
            <Link href={previous.href}>
              <small>← PREVIOUS</small>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.href}>
              <small>NEXT →</small>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
      <aside className="lesson-toc" aria-label="On this page">
        <div className="toc-inner">
          <span className="eyebrow">ON THIS PAGE</span>
          <nav>
            {sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
          </nav>
          {aside ?? (
            <div className="toc-help">
              <strong>Put it to work.</strong>
              <p>Do the practice task and build step before moving on.</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
