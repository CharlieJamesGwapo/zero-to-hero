"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="shell error-state" role="alert">
      <span className="eyebrow">REQUEST INTERRUPTED</span>
      <h1>Something didn’t load.</h1>
      <p>Try this page again. If it still fails, return to the curriculum.</p>
      <div className="hero-actions">
        <button className="button button-primary" type="button" onClick={reset}>
          Try again →
        </button>
        <Link className="button button-secondary" href="/curriculum">
          Back to curriculum →
        </Link>
      </div>
    </div>
  );
}
