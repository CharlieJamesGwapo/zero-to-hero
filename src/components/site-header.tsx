import Link from "next/link";
import Image from "next/image";
import { SearchDialog } from "./search-dialog";
import { MobileMenu } from "./mobile-menu";
import { RouteLink } from "./route-link";

const navigation = [
  { href: "/learn", label: "Learn" },
  { href: "/quests", label: "Quests" },
  { href: "/exercises", label: "Exercises" },
  { href: "/playground", label: "Playground" },
  { href: "/projects", label: "Projects" },
  { href: "/architecture", label: "Architecture" },
  { href: "/open-source", label: "Open Source" },
];

export function SiteHeader() {
  const repository =
    process.env.NEXT_PUBLIC_REPOSITORY_URL ??
    "https://github.com/CharlieJamesGwapo/zero-to-hero";
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="ZERO → HERO DEV home">
          <Image
            className="brand-logo"
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            priority
          />
          <span className="brand-name">
            ZERO <span className="brand-arrow">→</span> HERO <b>DEV</b>
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
            <Image
              className="brand-logo"
              src="/logo.png"
              alt=""
              width={52}
              height={52}
            />
            <span>
              ZERO <span className="brand-arrow">→</span> HERO <b>DEV</b>
            </span>
          </Link>
          <p>
            Learn. Build. Ship.
            <br />
            An open-source path to software you can explain.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/learn">Learn</Link>
          <Link href="/quests">Quests</Link>
          <Link href="/exercises">Exercises</Link>
          <Link href="/playground">Playground</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/architecture">Architecture</Link>
          <Link href="/workflow">Workflow</Link>
          <Link href="/open-source">Open Source</Link>
          <Link href="/glossary">Glossary</Link>
          <Link href="/contribute">Contribute</Link>
        </nav>
        <div className="footer-creator">
          <span className="eyebrow">CREATED BY</span>
          <strong>Charlie James Z. Abejo</strong>
          <p>AI Developer · Full-Stack Engineer</p>
          <div className="footer-creator-links">
            <a
              href="https://github.com/CharlieJamesGwapo"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://portfoliobboy.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio ↗
            </a>
            <a href="mailto:capstonee2@gmail.com">Email ↗</a>
          </div>
        </div>
        <p className="footer-note">
          Content and code are openly licensed. Progress stays in your browser.
        </p>
      </div>
    </footer>
  );
}
