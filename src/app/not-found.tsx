import Link from "next/link";
export default function NotFound() {
  return (
    <div className="shell not-found">
      <div>
        <span className="eyebrow">404 / ROUTE NOT FOUND</span>
        <h1>This page isn’t on the path.</h1>
        <p>
          The route may have changed, or the lesson has not been built yet.
          Start again from the curriculum.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/">
            Back home →
          </Link>
          <Link className="button button-secondary" href="/curriculum">
            Explore curriculum →
          </Link>
        </div>
      </div>
      <div className="not-found-route" aria-hidden="true">
        <span>REQUEST</span>
        <i />
        <span>ROUTE</span>
        <i />
        <span>?</span>
      </div>
    </div>
  );
}
