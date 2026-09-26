"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { searchIndex } from "@/lib/search-index";

export function SearchDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches(
        "input, textarea, select, [contenteditable='true']",
      );
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k" &&
        !typing
      ) {
        event.preventDefault();
        dialog.current?.showModal();
        requestAnimationFrame(() => input.current?.focus());
      }
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  const results = searchIndex(query);
  return (
    <>
      <button
        type="button"
        className="search-trigger"
        data-tooltip="Search lessons"
        onClick={() => {
          dialog.current?.showModal();
          requestAnimationFrame(() => input.current?.focus());
        }}
        aria-label="Search lessons, projects, and terms"
      >
        <span aria-hidden="true" className="search-glyph">
          ⌕
        </span>
        <span>Search</span>
        <kbd>⌘ K</kbd>
      </button>
      <dialog
        ref={dialog}
        className="search-dialog"
        aria-label="Search Zero to Hero"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            dialog.current?.close();
            return;
          }
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          const links = Array.from(
            dialog.current?.querySelectorAll<HTMLAnchorElement>(
              ".search-result",
            ) ?? [],
          );
          if (!links.length) return;
          const current = links.indexOf(
            document.activeElement as HTMLAnchorElement,
          );
          if (event.key === "ArrowDown") {
            event.preventDefault();
            links[Math.min(current + 1, links.length - 1)].focus();
          } else if (current >= 0) {
            event.preventDefault();
            if (current === 0) input.current?.focus();
            else links[current - 1].focus();
          }
        }}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="search-modal">
          <div className="search-modal-top">
            <span className="eyebrow">FIND YOUR NEXT STEP</span>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close search"
            >
              ✕
            </button>
          </div>
          <label className="sr-only" htmlFor="global-search">
            Search lessons, projects, and terms
          </label>
          <input
            ref={input}
            id="global-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search lessons, projects, terms…"
            autoComplete="off"
          />
          <div className="search-results" aria-live="polite">
            {results.length ? (
              results.map((item) => (
                <Link
                  href={item.href}
                  key={`${item.category}-${item.href}`}
                  onClick={() => dialog.current?.close()}
                  className="search-result"
                >
                  <span className="result-category">{item.category}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))
            ) : (
              <p className="search-empty">
                No matches. Try “HTTP”, “React”, or “testing”.
              </p>
            )}
          </div>
          <div className="search-modal-bottom">
            Press <kbd>Esc</kbd> to close ·{" "}
            <span>{results.length} results</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
