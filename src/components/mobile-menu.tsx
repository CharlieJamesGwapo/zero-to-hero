"use client";

import { useEffect, useRef, useState } from "react";
import { RouteLink } from "./route-link";

export function MobileMenu({
  navigation,
  repository,
}: {
  navigation: { href: string; label: string }[];
  repository: string;
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    }
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div className="mobile-menu" data-open={open}>
      <button
        ref={toggle}
        className="mobile-menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        Menu <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <button
        className="mobile-menu-backdrop"
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={close}
      />
      <nav id="mobile-navigation" aria-label="Mobile navigation" inert={!open}>
        {navigation.map((item) => (
          <RouteLink
            key={item.href}
            href={item.href}
            label={item.label}
            onClick={close}
          />
        ))}
        <RouteLink href="/glossary" label="Glossary" onClick={close} />
        <RouteLink href="/contribute" label="Contribute" onClick={close} />
        <a href={repository} target="_blank" rel="noreferrer" onClick={close}>
          GitHub ↗
        </a>
      </nav>
    </div>
  );
}
