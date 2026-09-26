"use client";

import Link from "next/link";
import { useRef } from "react";

export function MobileMenu({
  navigation,
  repository,
}: {
  navigation: { href: string; label: string }[];
  repository: string;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const close = () => details.current?.removeAttribute("open");
  return (
    <details className="mobile-menu" ref={details}>
      <summary aria-label="Open navigation">
        Menu <span aria-hidden="true">☰</span>
      </summary>
      <nav aria-label="Mobile navigation">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} onClick={close}>
            {item.label}
          </Link>
        ))}
        <Link href="/glossary" onClick={close}>
          Glossary
        </Link>
        <Link href="/contribute" onClick={close}>
          Contribute
        </Link>
        <a href={repository} target="_blank" rel="noreferrer" onClick={close}>
          GitHub ↗
        </a>
      </nav>
    </details>
  );
}
