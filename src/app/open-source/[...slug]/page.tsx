import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonReader } from "@/components/lesson-reader";
import {
  getOpenSourceLesson,
  openSourceLessons,
  openSourceSections,
} from "@/lib/open-source";
import { openSourceContent } from "@/lib/open-source-content";

type Props = { params: Promise<{ slug: string[] }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return openSourceLessons.map((item) => ({
    slug: item.path.replace("/open-source/", "").split("/"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getOpenSourceLesson(slug.join("/"));
  return {
    title: item ? `${item.title} · Open Source` : "Open Source lesson",
    description: item?.summary,
  };
}

export default async function OpenSourceLessonPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join("/");
  const item = getOpenSourceLesson(path);
  const Content = openSourceContent[path];
  if (!item || !Content) notFound();
  const index = openSourceLessons.findIndex(
    (lesson) => lesson.path === item.path,
  );
  const previous = openSourceLessons[index - 1];
  const next = openSourceLessons[index + 1];
  return (
    <LessonReader
      back={{ href: "/open-source", title: "Open Source" }}
      breadcrumb={{ href: "/open-source", title: item.category }}
      eyebrow={`${item.category.toUpperCase()} / ${item.minutes} MIN READ`}
      title={item.title}
      summary={item.summary}
      id={item.path.slice(1)}
      content={Content}
      sections={openSourceSections}
      navigation={openSourceLessons.map((lesson, number) => ({
        href: lesson.path,
        number: String(number + 1).padStart(2, "0"),
        title: lesson.title,
        current: lesson.path === item.path,
      }))}
      previous={previous && { href: previous.path, title: previous.title }}
      next={next && { href: next.path, title: next.title }}
    />
  );
}
