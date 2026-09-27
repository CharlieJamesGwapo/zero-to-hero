import type { Metadata } from "next";
import Link from "next/link";
import { HtmlWorkshop } from "@/components/html-workshop";

export const metadata: Metadata = {
  title: "HTML workshop",
  description: "Build and preview a complete HTML page with guided checks.",
};
export default async function WorkshopPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string }>;
}) {
  const { focus } = await searchParams;
  return (
    <div className="shell page-wrap">
      <div className="page-intro workshop-intro">
        <Link className="eyebrow" href="/learn/html">
          ← GUIDED HTML MODULE
        </Link>
        <h1>
          Build your page <em>as you learn.</em>
        </h1>
        <p>
          Edit real HTML, preview it instantly, and work through four
          milestones. Your draft stays in this browser; the preview blocks
          scripts and form submission.
        </p>
      </div>
      <HtmlWorkshop initialFocus={focus} />
    </div>
  );
}
