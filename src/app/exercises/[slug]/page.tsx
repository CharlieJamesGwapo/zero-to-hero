import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { exercises, getExercise } from "@/lib/challenges";
import { ChallengeDetail } from "@/components/challenge-detail";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return exercises.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getExercise((await params).slug);
  return { title: item?.title ?? "Exercise", description: item?.objective };
}
export default async function ExercisePage({ params }: Props) {
  const item = getExercise((await params).slug);
  if (!item) notFound();
  return <ChallengeDetail item={item} kind="exercises" />;
}
