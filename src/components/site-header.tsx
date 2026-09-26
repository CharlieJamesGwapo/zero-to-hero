import Link from "next/link";
import { SearchDialog } from "./search-dialog";

const navigation = [
  { href: "/curriculum", label: "Curriculum" },
  { href: "/projects", label: "Projects" },
  { href: "/architecture", label: "Architecture" },
  { href: "/workflow", label: "Workflow" },
];

export function SiteHeader() {
  const repository =
    process.env.NEXT_PUBLIC_REPOSITORY_URL ??
    "https://github.com/CharlieJamesGwapo/zero-to-hero";
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="Zero to Hero home">
          <span className="brand-mark">
            0<span>→</span>H
          </span>
          <span className="brand-name">
            ZERO <span>→</span> HERO
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <SearchDialog />
          {repository ? (
            <a
              className="header-source"
              href={repository}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link className="header-source" href="/contribute">
              Open source <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">
            Menu <span aria-hidden="true">☰</span>
          </summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/glossary">Glossary</Link>
            <Link href="/contribute">Contribute</Link>
          </nav>
        </details>
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
