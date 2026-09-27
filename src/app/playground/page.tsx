import type { Metadata } from "next";
import { PlaygroundExperience } from "@/components/playground-experience";
import { languages, type Language } from "@/lib/playground";

export const metadata: Metadata = {
  title: "Code playground",
  description:
    "Run JavaScript, TypeScript, and Python in your browser, or preview HTML and CSS.",
};

type Props = { searchParams: Promise<{ language?: string; code?: string }> };

export default async function PlaygroundPage({ searchParams }: Props) {
  const query = await searchParams;
  const language =
    query.language && query.language in languages
      ? (query.language as Language)
      : "javascript";
  const code =
    typeof query.code === "string" && query.code.length <= 2000
      ? query.code
      : undefined;
  return (
    <div className="shell interactive-page">
      <div className="page-intro">
        <span className="eyebrow">LEARN BY RUNNING CODE / FREE & OPEN</span>
        <h1>
          Code without <em>setup.</em>
        </h1>
        <p>
          Write code. Run it. Break it. Learn why. Your experiments run in your
          browser.
        </p>
      </div>
      <PlaygroundExperience initialLanguage={language} initialCode={code} />
    </div>
  );
}
