# ZERO → HERO

**Learn. Build. Ship.** A practical, open-source path from a first web page to the architecture and workflow behind a production application.

[Explore the curriculum](https://zero-to-hero-omega-one.vercel.app/curriculum) · [Project briefs](https://zero-to-hero-omega-one.vercel.app/projects) · [Contributing guide](CONTRIBUTING.md)

## What is here

- Twelve connected levels, from foundations and HTML to databases, production, DevOps, and architecture
- Twelve focused MDX lessons with a problem, explanation, example, practice task, build step, and checkpoint
- Five project briefs that grow from a portfolio to an organization-based SaaS application
- Clickable architecture diagrams, a real-world workflow guide, and a glossary
- Local progress and bookmarks, a deterministic starting recommendation, and `Cmd/Ctrl + K` search

The path is designed to be extended. A level currently has one anchor lesson; the topic list names the broader skills that future lessons and contributions should cover. Project work is essential to completing a level.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. No account, API key, database, or environment file is required.

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## How it is built

Next.js App Router renders pages and MDX content statically where possible. TypeScript indexes curriculum, projects, and glossary entries. Tailwind CSS 4 is installed; the current visual system uses explicit CSS tokens and component styles in `src/app/globals.css` for a small, inspectable design layer. Browser-only code is limited to search, progress, and the start chooser. Progress is stored on the current device in `localStorage`, so clearing browser data removes it.

| Location                | Purpose                                             |
| ----------------------- | --------------------------------------------------- |
| `content/`              | Editable MDX lessons                                |
| `src/lib/curriculum.ts` | Level and lesson metadata                           |
| `src/lib/projects.ts`   | Project briefs and review criteria                  |
| `src/lib/glossary.ts`   | Developer terms and related lessons                 |
| `src/app/`              | Routes and page layouts                             |
| `src/components/`       | Search, progress, navigation, and recommendation UI |
| `docs/architecture.md`  | Product architecture and route map                  |

## Add content

Read [CONTRIBUTING.md](CONTRIBUTING.md) for a short contribution workflow. New lessons need an MDX file, an entry in the curriculum index, and a static import in `src/lib/lesson-content.tsx`. Keep examples runnable and checkpoints observable.

## License

MIT. See [LICENSE](LICENSE).
