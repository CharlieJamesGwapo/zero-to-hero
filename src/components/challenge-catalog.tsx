import Link from "next/link";
import { type Challenge, type Quest } from "@/lib/challenges";
import { languages } from "@/lib/playground";

export function ChallengeCatalog({
  kind,
  items,
  query,
}: {
  kind: "quests" | "exercises";
  items: (Challenge | Quest)[];
  query: { language?: string; difficulty?: string; topic?: string };
}) {
  const languagesInCatalog = [...new Set(items.map((item) => item.language))];
  const topics = [...new Set(items.map((item) => item.topic))];
  const filtered = items.filter(
    (item) =>
      (!query.language || item.language === query.language) &&
      (!query.difficulty || item.difficulty === query.difficulty) &&
      (!query.topic || item.topic === query.topic),
  );
  return (
    <>
      <form
        className="catalog-filters"
        method="get"
        aria-label={`Filter ${kind}`}
      >
        <label>
          Language
          <select name="language" defaultValue={query.language ?? ""}>
            <option value="">All languages</option>
            {languagesInCatalog.map((id) => (
              <option key={id} value={id}>
                {id === "sql" ? "SQL" : languages[id].name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Difficulty
          <select name="difficulty" defaultValue={query.difficulty ?? ""}>
            <option value="">All levels</option>
            {["Beginner", "Intermediate", "Advanced"].map((id) => (
              <option key={id}>{id}</option>
            ))}
          </select>
        </label>
        <label>
          Topic
          <select name="topic" defaultValue={query.topic ?? ""}>
            <option value="">All topics</option>
            {topics.map((id) => (
              <option key={id}>{id}</option>
            ))}
          </select>
        </label>
        <button className="button button-secondary" type="submit">
          Apply filters ↗
        </button>
        <Link href={`/${kind}`}>Clear</Link>
      </form>
      <p className="catalog-count">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </p>
      <div className="challenge-grid">
        {filtered.map((item) => (
          <Link
            href={`/${kind}/${item.slug}`}
            className="challenge-card"
            key={item.slug}
          >
            <span className="eyebrow">
              {"number" in item
                ? `QUEST ${item.number} / ${item.category}`
                : `${item.topic.toUpperCase()} / PRACTICE`}
            </span>
            <h2>{item.title}</h2>
            <p>{item.objective}</p>
            <div className="challenge-card-meta">
              <span>
                {item.language === "sql"
                  ? "SQL"
                  : languages[item.language].name}
              </span>
              <span>{item.difficulty}</span>
              <span>{item.minutes} min</span>
            </div>
            <strong>{kind === "quests" ? "Start quest" : "Practice"} ↗</strong>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="catalog-empty">No matches. Try a different filter.</p>
      )}
    </>
  );
}
