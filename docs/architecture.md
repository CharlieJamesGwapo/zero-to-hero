# Product architecture

Zero → Hero is a content-first Next.js application. The App Router renders public pages and MDX lessons on the server. Small client components handle local progress, bookmarks, search, and the start recommendation. No account or server-side personal data is required for the first release.

## Content model

- `src/lib/curriculum.ts` is the canonical level and lesson index.
- `content/<level>/<lesson>.mdx` contains editorial lesson content, separated from UI.
- `src/lib/projects.ts` holds project briefs and acceptance criteria.
- `src/lib/glossary.ts` holds short definitions and deeper lesson links.
- Routes derive from those indexes so navigation, search, and static params share one source of truth.

## Route map

| Route                              | Purpose                                                      |
| ---------------------------------- | ------------------------------------------------------------ |
| `/`                                | Explain the path and lead to a starting point                |
| `/curriculum`                      | Visual level map and checkpoints                             |
| `/learn/[level]/[lesson]`          | MDX lesson, adjacent lessons, progress and bookmark controls |
| `/projects` and `/projects/[slug]` | Project ladder and detailed briefs                           |
| `/architecture`                    | Four linked architecture progressions                        |
| `/workflow`                        | Product and Git delivery workflow                            |
| `/glossary`                        | Searchable term index                                        |
| `/contribute`                      | Open-source participation guide                              |

## Client state

`zero-to-hero-progress-v1` in localStorage stores arrays of completed and bookmarked lesson IDs and completed project slugs. The UI works when storage is unavailable; progress stays on the current device and is not an account or cloud backup. Local state is parsed defensively and updates subscribers in the same tab.

## Visual system

Editorial developer documentation: off-white background, ink text, restrained green actions, muted borders, Geist Sans and Mono. Components use semantic HTML, visible focus, short motion with reduced-motion support, and content-first mobile layouts.

## Deployment

The project is Vercel-compatible but can run on any Next.js host. No external service is required to build or preview. The public GitHub URL is linked from the Contribute page and can be displayed in the header through `NEXT_PUBLIC_REPOSITORY_URL`.
