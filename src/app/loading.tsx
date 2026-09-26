export default function Loading() {
  return (
    <div
      className="shell loading-state"
      aria-label="Loading page"
      role="status"
    >
      <div className="loading-line loading-eyebrow" />
      <div className="loading-line loading-title" />
      <div className="loading-line loading-title short" />
      <div className="loading-line loading-copy" />
      <div className="loading-line loading-copy short" />
      <span className="sr-only">Loading page</span>
    </div>
  );
}
