import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { levels, lessons, getLesson } from "@/lib/curriculum";
import { lessonContent, lessonSections } from "@/lib/lesson-content";
import { LessonReader } from "@/components/lesson-reader";
import { lessonPractice } from "@/lib/lesson-practice";

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
  const practice = lessonPractice[item.id];
  return (
    <LessonReader
      back={{ href: "/curriculum", title: "Curriculum" }}
      breadcrumb={{ href: `/curriculum#${level}`, title: item.levelTitle }}
      eyebrow={`LEVEL ${item.levelNumber} / ${item.readingMinutes} MIN READ`}
      title={item.title}
      summary={item.summary}
      id={item.id}
      content={Content}
      sections={lessonSections}
      practice={
        practice && {
          playground:
            practice.language && practice.code
              ? `/playground?language=${practice.language}&code=${encodeURIComponent(practice.code)}`
              : undefined,
          exercise: practice.exercise,
          exerciseLabel: practice.exerciseLabel,
        }
      }
      navigation={levels.map((entry) => ({
        href: `/learn/${entry.slug}/${entry.lessons[0].slug}`,
        number: entry.number,
        title: entry.title,
        current: entry.slug === level,
      }))}
      previous={
        previous && {
          href: `/learn/${previous.levelSlug}/${previous.slug}`,
          title: previous.title,
        }
      }
      next={
        next
          ? { href: `/learn/${next.levelSlug}/${next.slug}`, title: next.title }
          : { href: "/projects/saas", title: "Build the capstone" }
      }
    />
  );
}
