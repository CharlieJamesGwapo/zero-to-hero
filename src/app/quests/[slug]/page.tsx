import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { quests, getQuest } from "@/lib/challenges";
import { ChallengeDetail } from "@/components/challenge-detail";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return quests.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getQuest((await params).slug);
  return { title: item?.title ?? "Quest", description: item?.objective };
}
export default async function QuestPage({ params }: Props) {
  const item = getQuest((await params).slug);
  if (!item) notFound();
  return <ChallengeDetail item={item} kind="quests" />;
}
