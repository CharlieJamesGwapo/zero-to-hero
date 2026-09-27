# ZERO → HERO DEV

**Learn. Build. Ship.** A practical, open-source path from your first web page to building, deploying, and contributing to full-stack software.

[Live site](https://zerotoherodev.vercel.app) · [Learn](https://zerotoherodev.vercel.app/learn) · [HTML module](https://zerotoherodev.vercel.app/learn/html) · [Resources](https://zerotoherodev.vercel.app/resources) · [AI guides](https://zerotoherodev.vercel.app/ai) · [Playground](https://zerotoherodev.vercel.app/playground)

Created by **Charlie James Z. Abejo**, AI Developer · Full-Stack Engineer. [GitHub](https://github.com/CharlieJamesGwapo) · [Portfolio](https://portfoliobboy.vercel.app/) · [Email](mailto:capstonee2@gmail.com).

## Learn, build, contribute

- **Learn:** Twelve connected web-development levels and focused MDX lessons from foundations to architecture. HTML has four guided lessons and a live workshop; other levels currently have one anchor lesson each.
- **Build:** Five project briefs grow from a portfolio to an organization-based application. Each brief includes requirements, architecture, issues, tests, deployment, and review questions.
- **Contribute:** The Open Source track teaches Git, GitHub, issues, forks, pull requests, reviews, CI, releases, licenses, and a real contribution to this repository.

The site also has a glossary, architecture diagrams, a development workflow guide, local progress and bookmarks, a start recommendation, and `Cmd/Ctrl + K` search. Progress stays in your browser; there is no account or cloud sync. Download a JSON progress backup from `/learn` and import it on another device; importing merges saved completion and bookmarks. The HTML workshop draft is separate and can be downloaded as an HTML file.

The learning resource directory links to official documentation and selected free videos. Video cards show previews and open a YouTube player on the page when selected; an external link remains available. Resource metadata is original; third-party video content is served by YouTube. The AI guide offers workflows for coding agents and model APIs plus a client-side prompt builder. It does not make model calls or require an API key.

Eight free learning paths now connect the existing web and open-source curriculum to new Programming Fundamentals, Python, C++, JavaScript, TypeScript, and Computer Science stages. Python and C++ each include 15 beginner stages. Quests and exercises provide visible checks, hints, and reference solutions. The code playground runs JavaScript, TypeScript, and Python in browser workers and previews HTML/CSS in an isolated frame. C++ and SQL practice requires local tools; the interface says so plainly. Python loads from a pinned Pyodide CDN only when selected. See [learning platform architecture](docs/learning-platform.md) for runtime and content details.

Each major [project brief](https://zerotoherodev.vercel.app/projects) links to public files in `starters/`. These are small starting points with explicit next steps; authentication, payment, and organization scaffolds are not finished services.

## Run locally

Use Node.js 24 and npm. No account, database, API key, or environment file is required.

```bash
git clone https://github.com/CharlieJamesGwapo/zero-to-hero.git
cd zero-to-hero
npm ci
npm run dev
```

Open `http://localhost:3000`. The app uses the Next.js App Router, TypeScript, MDX, and Tailwind CSS 4. The visual system is in `src/app/globals.css`; shared motion tokens and reduced-motion rules are in `src/app/motion.css`.

Motion is progressive: page content is rendered before JavaScript runs. `src/components/motion-controller.tsx` adds section reveals and progress indicators after hydration. Keep new interactions usable by keyboard, and provide a clear state change when motion is reduced or unavailable.

## Verify a change

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run format:check
```

The same core checks run in GitHub Actions for pushes and pull requests. A passing check is evidence about code behavior and build health; content still needs human review.

## Find your way around

| Location                                                           | Purpose                                                   |
| ------------------------------------------------------------------ | --------------------------------------------------------- |
| `content/`                                                         | MDX lessons for web development and open source           |
| `content/tracks/paths.ts`                                          | Beginner path content and runnable examples               |
| `src/lib/challenges.ts`                                            | Quest and exercise schemas and content                    |
| `src/lib/browser-runner.ts` and `public/workers/python.mjs`        | Browser-only code execution                               |
| `src/lib/curriculum.ts`                                            | Main level and lesson index                               |
| `src/lib/open-source.ts`                                           | Open Source track routes, stages, workflow, and checklist |
| `src/lib/lesson-content.tsx` and `src/lib/open-source-content.tsx` | Static MDX import maps                                    |
| `src/lib/projects.ts` and `src/lib/glossary.ts`                    | Project briefs and term definitions                       |
| `src/components/lesson-reader.tsx`                                 | Shared lesson layout                                      |
| `src/components/code-block.tsx` and `mdx-components.tsx`           | Lesson code controls and MDX component mapping            |
| `src/app/`                                                         | Public routes and metadata                                |
| `tests/`                                                           | Content integrity and progress checks                     |
| `docs/architecture.md`                                             | App architecture and route map                            |
| `docs/learning-platform.md`                                        | New routes, content process, and runtime boundaries       |

## Make a first contribution

1. Read [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and [SECURITY.md](SECURITY.md).
2. Check [open issues](https://github.com/CharlieJamesGwapo/zero-to-hero/issues) or propose a small, factual correction. Do not assume a static tutorial example is an active issue.
3. Fork, clone, and create a focused branch.
4. Edit one source file or lesson and preview the result.
5. Run the relevant checks above; describe what you actually verified.
6. Push your branch and open a pull request to `main`. Respond to review and revise as needed. Maintainers decide whether to merge.

A new main-curriculum lesson needs its MDX file, an entry in `src/lib/curriculum.ts`, and an import in `src/lib/lesson-content.tsx`. A new Open Source lesson needs the same three steps using `content/open-source/`, `src/lib/open-source.ts`, and `src/lib/open-source-content.tsx`.

## License

MIT. See [LICENSE](LICENSE). Check the terms of dependencies and any external assets separately before reusing them.
