import Link from "next/link";

export function GlossaryTerm({
  term,
  definition,
  href,
}: {
  term: string;
  definition: string;
  href: string;
}) {
  return (
    <span
      className="glossary-term"
      tabIndex={0}
      role="group"
      aria-label={`${term}: ${definition}`}
    >
      {term}
      <span className="glossary-popover">
        <strong>{term}</strong>
        <span>{definition}</span>
        <Link href={href}>Open glossary →</Link>
      </span>
    </span>
  );
}
