"use client";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { resources, resourceTopics, type Resource } from "@/lib/resources";
import { toggleProgress, useProgress } from "./progress";

function GuidePreview({
  item,
}: {
  item: Extract<Resource, { format: "Guide" | "Course" }>;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const domain = new URL(item.url).hostname.replace(/^www\./, "");

  return (
    <a
      className="resource-guide-preview"
      data-topic={item.topic}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${item.title} on ${item.publisher} in a new tab`}
    >
      {item.previewImage && !imageFailed ? (
        <Image
          src={item.previewImage}
          alt=""
          width={600}
          height={338}
          sizes="(max-width: 500px) calc(100vw - 76px), (max-width: 960px) 45vw, 360px"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="resource-guide-art" aria-hidden="true">
          <span className="resource-guide-window">
            <span className="resource-guide-browser">{domain}</span>
            <span className="resource-guide-publisher">{item.publisher}</span>
            <span className="resource-guide-title">{item.title}</span>
            <span className="resource-guide-lines">
              <i />
              <i />
              <i />
            </span>
          </span>
        </span>
      )}
      <span className="resource-guide-open" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

export function ResourceExplorer({ initialTopic }: { initialTopic?: string }) {
  const player = useRef<HTMLDialogElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<
    Extract<Resource, { format: "Video" }> | undefined
  >();
  const progress = useProgress();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState(
    resourceTopics.some((item) => item === initialTopic)
      ? initialTopic!
      : "All",
  );
  const [format, setFormat] = useState("All formats");
  const [savedOnly, setSavedOnly] = useState(false);
  const filtersActive =
    query.trim() !== "" ||
    topic !== "All" ||
    format !== "All formats" ||
    savedOnly;
  function clearFilters() {
    setQuery("");
    setTopic("All");
    setFormat("All formats");
    setSavedOnly(false);
  }
  const filtered = useMemo(
    () =>
      resources.filter(
        (item) =>
          (topic === "All" || item.topic === topic) &&
          (format === "All formats" || item.format === format) &&
          (!savedOnly || progress.resources.includes(item.id)) &&
          `${item.title} ${item.publisher} ${item.summary} ${item.topic}`
            .toLowerCase()
            .includes(query.toLowerCase().trim()),
      ),
    [query, topic, format, savedOnly, progress.resources],
  );
  function playVideo(item: Extract<Resource, { format: "Video" }>) {
    setSelectedVideo(item);
    player.current?.showModal();
  }
  return (
    <div className="resource-explorer">
      <div className="resource-controls">
        <label>
          Search resources
          <input
            type="search"
            placeholder="HTML, forms, Git..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          Topic
          <select
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          >
            {resourceTopics.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Format
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value)}
          >
            {["All formats", "Guide", "Course", "Video"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="resource-saved-toggle">
          <input
            type="checkbox"
            checked={savedOnly}
            onChange={(event) => setSavedOnly(event.target.checked)}
          />{" "}
          Saved only
        </label>
      </div>
      <div className="resource-results-bar">
        <p className="resource-count" role="status">
          {filtered.length} of {resources.length} resources shown · Guides and
          courses open on the publisher&apos;s site.
        </p>
        {filtersActive && (
          <button type="button" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>
      <div className="resource-grid">
        {filtered.map((item) => {
          const saved = progress.resources.includes(item.id);
          return (
            <article className="resource-card" key={item.id}>
              <div className="resource-card-top">
                <span className="eyebrow">
                  {item.topic} / {item.format}
                </span>
                <button
                  type="button"
                  aria-label={`${saved ? "Remove" : "Save"} ${item.title}${saved ? " from saved resources" : " to saved resources"}`}
                  aria-pressed={saved}
                  onClick={() => toggleProgress("resources", item.id)}
                >
                  {saved ? "★ Saved" : "☆ Save"}
                </button>
              </div>
              {item.format === "Video" && (
                <button
                  className="resource-video-thumb"
                  type="button"
                  aria-label={`Play ${item.title} on this page`}
                  onClick={() => playVideo(item)}
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
                    alt=""
                    width={480}
                    height={360}
                    sizes="(max-width: 500px) calc(100vw - 76px), (max-width: 960px) 45vw, 360px"
                  />
                  <span className="resource-video-play" aria-hidden="true">
                    ▶
                  </span>
                  <span className="resource-video-caption" aria-hidden="true">
                    Watch here
                  </span>
                </button>
              )}
              {item.format !== "Video" && <GuidePreview item={item} />}
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
              <small className="resource-publisher">{item.publisher}</small>
              <p className="resource-use-for">
                <span>How to use it</span>
                {item.useFor}
              </p>
              {item.format === "Video" ? (
                <div className="resource-video-actions">
                  <button type="button" onClick={() => playVideo(item)}>
                    Watch on this page ▶
                  </button>
                  <a
                    className="text-link"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open on YouTube ↗
                  </a>
                </div>
              ) : (
                <a
                  className="text-link"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open {item.format.toLowerCase()} ↗
                </a>
              )}
            </article>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="resource-empty">
          <h2>No matching resources</h2>
          <p>Try a broader topic or clear your search.</p>
          <button
            className="button button-secondary"
            type="button"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
      <dialog
        ref={player}
        className="resource-player-dialog"
        aria-label={
          selectedVideo ? `Watch ${selectedVideo.title}` : "Video player"
        }
        onClose={() => setSelectedVideo(undefined)}
        onClick={(event) => {
          if (event.target === player.current) player.current?.close();
        }}
      >
        {selectedVideo && (
          <div className="resource-player-content">
            <div className="resource-player-header">
              <div>
                <span className="eyebrow">{selectedVideo.topic} / VIDEO</span>
                <h2>{selectedVideo.title}</h2>
              </div>
              <button
                type="button"
                aria-label="Close video"
                onClick={() => player.current?.close()}
              >
                ✕
              </button>
            </div>
            <iframe
              title={selectedVideo.title}
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?rel=0`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <div className="resource-player-footer">
              <span>
                Video by {selectedVideo.publisher}. If playback is unavailable,
                open it on YouTube.
              </span>
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on YouTube ↗
              </a>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
