import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { levels, lessons, getLesson } from "@/lib/curriculum";
import { lessonContent, lessonSections } from "@/lib/lesson-content";
import { LessonActions, LevelProgress } from "@/components/progress";

type Props = { params: Promise<{ level: string; lesson: string }> };
export function generateStaticParams() {
  return lessons.map((lesson) => ({
    level: lesson.levelSlug,
    lesson: lesson.slug,
  }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level, lesson } = await params;
  const item = getLesson(level, lesson);
  return { title: item?.title ?? "Lesson", description: item?.summary };
}

export default async function LessonPage({ params }: Props) {
  const { level, lesson } = await params;
  const item = getLesson(level, lesson);
  const Content = lessonContent[`${level}/${lesson}`];
  if (!item || !Content) notFound();
  const index = lessons.findIndex((entry) => entry.id === item.id);
  const previous = lessons[index - 1];
  const next = lessons[index + 1];
  return (
    <div className="shell lesson-layout">
      <aside className="lesson-sidebar" aria-label="Curriculum">
        <Link className="sidebar-back" href="/curriculum">
          ← All levels
        </Link>
        <div className="sidebar-heading">
          THE PATH <span>{levels.length} LEVELS</span>
        </div>
        <nav>
          {levels.map((entry) => (
            <div
              className={
                entry.slug === level ? "sidebar-level current" : "sidebar-level"
              }
              key={entry.slug}
            >
              <Link href={`/learn/${entry.slug}/${entry.lessons[0].slug}`}>
                <span>{entry.number}</span>
                {entry.title}
              </Link>
              {entry.slug === level && (
                <LevelProgress ids={entry.lessons.map((unit) => unit.id)} />
              )}
            </div>
          ))}
        </nav>
        <details className="mobile-curriculum">
          <summary>
            Browse the 12 levels <span aria-hidden="true">⌄</span>
          </summary>
          <nav>
            {levels.map((entry) => (
              <Link
                key={entry.slug}
                href={`/learn/${entry.slug}/${entry.lessons[0].slug}`}
              >
                {entry.number} / {entry.title}
              </Link>
            ))}
          </nav>
        </details>
      </aside>
      <article className="lesson-article">
        <div className="lesson-breadcrumb">
          <Link href="/curriculum">Curriculum</Link>
          <span>/</span>
          <Link href={`/curriculum#${level}`}>{item.levelTitle}</Link>
          <span>/</span>
          <span>Lesson 01</span>
        </div>
        <header className="lesson-header">
          <span className="eyebrow">
            LEVEL {item.levelNumber} / {item.readingMinutes} MIN READ
          </span>
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
        </header>
        <div className="lesson-content">
          <Content />
        </div>
        <div className="lesson-finish">
          <div>
            <span className="eyebrow">KEEP THE LOOP MOVING</span>
            <h2>Build it. Explain it. Then continue.</h2>
            <p>
              Mark the lesson complete once you can use its idea in your own
              code and explain why it matters.
            </p>
          </div>
          <LessonActions id={item.id} />
        </div>
        <nav className="lesson-pagination" aria-label="Lesson navigation">
          {previous ? (
            <Link href={`/learn/${previous.levelSlug}/${previous.slug}`}>
              <small>← PREVIOUS</small>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/learn/${next.levelSlug}/${next.slug}`}>
              <small>NEXT →</small>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <Link href="/projects/saas">
              <small>YOUR NEXT STEP →</small>
              <strong>Build the capstone</strong>
            </Link>
          )}
        </nav>
      </article>
      <aside className="lesson-toc" aria-label="On this page">
        <div className="toc-inner">
          <span className="eyebrow">ON THIS PAGE</span>
          <nav>
            {lessonSections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>
          <div className="toc-help">
            <strong>Put it to work.</strong>
            <p>
              Each lesson includes a task and a build step. Follow both before
              moving on.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
