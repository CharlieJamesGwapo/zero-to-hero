import Link from "next/link";
export default function NotFound() {
  return (
    <div className="shell not-found">
      <span className="eyebrow">404 / PAGE NOT FOUND</span>
      <h1>This route doesn’t exist.</h1>
      <p>Use the curriculum to find the next lesson or search for a term.</p>
      <Link className="button button-primary" href="/curriculum">
        Explore curriculum →
      </Link>
    </div>
  );
}
