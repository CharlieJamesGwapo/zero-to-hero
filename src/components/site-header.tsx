import Link from "next/link";
import { SearchDialog } from "./search-dialog";
import { MobileMenu } from "./mobile-menu";
import { RouteLink } from "./route-link";

const navigation = [
  { href: "/curriculum", label: "Curriculum" },
  { href: "/projects", label: "Projects" },
  { href: "/architecture", label: "Architecture" },
  { href: "/workflow", label: "Workflow" },
  { href: "/open-source", label: "Open Source" },
];

export function SiteHeader() {
  const repository =
    process.env.NEXT_PUBLIC_REPOSITORY_URL ??
    "https://github.com/CharlieJamesGwapo/zero-to-hero";
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="Zero to Hero home">
          <span className="brand-name">
            ZERO <span>→</span> HERO
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <RouteLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
        <div className="header-actions">
          <SearchDialog />
          <a
            className="header-source"
            href={repository}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
        <MobileMenu navigation={navigation} repository={repository} />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            ZERO <span>→</span> HERO
          </Link>
          <p>
            Learn. Build. Ship.
            <br />
            An open-source path to software you can explain.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/curriculum">Curriculum</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/architecture">Architecture</Link>
          <Link href="/workflow">Workflow</Link>
          <Link href="/open-source">Open Source</Link>
          <Link href="/glossary">Glossary</Link>
          <Link href="/contribute">Contribute</Link>
        </nav>
        <p className="footer-note">
          Content and code are openly licensed. Progress stays in your browser.
        </p>
      </div>
    </footer>
  );
}
