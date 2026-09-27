# Product architecture

Zero → Hero is a content-first Next.js application. The App Router renders public pages and MDX lessons on the server. Client components handle local progress, search, code practice, and the start recommendation. No account or server-side personal data is required for core learning.

## Content model

- `src/lib/curriculum.ts` is the canonical level and lesson index.
- `content/<level>/<lesson>.mdx` contains editorial lesson content, separated from UI.
- `src/lib/open-source.ts` is the Open Source lesson, stage, workflow, and checklist index. `content/open-source/` contains its MDX lessons.
- `src/components/lesson-reader.tsx` renders both curriculum and Open Source lessons through one reader layout.
- `src/lib/projects.ts` holds project briefs and acceptance criteria.
- `content/tracks/paths.ts` holds the new beginner learning path content.
- `src/lib/challenges.ts` holds typed quest and exercise content, visible checks, hints, and review guidance.
- `starters/` holds public starter files for each major project; these are learning scaffolds, not finished applications.
- `src/lib/glossary.ts` holds short definitions and deeper lesson links.
- Routes derive from those indexes so navigation, search, and static params share one source of truth.

## Route map

| Route                                | Purpose                                                      |
| ------------------------------------ | ------------------------------------------------------------ |
| `/`                                  | Explain the path and lead to a starting point                |
| `/curriculum`                        | Visual level map and checkpoints                             |
| `/learn`                             | Local dashboard and learning path chooser                    |
| `/learn/[level]/[lesson]`            | MDX lesson, adjacent lessons, progress and bookmark controls |
| `/tracks/[track]/[stage]`            | Beginner stage, runnable example, practice, and progress     |
| `/quests` and `/quests/[slug]`       | Structured coding and project missions                       |
| `/exercises` and `/exercises/[slug]` | Focused practice and visible browser checks                  |
| `/playground`                        | Browser-only code execution and HTML/CSS preview             |
| `/projects` and `/projects/[slug]`   | Project ladder and detailed briefs                           |
| `/architecture`                      | Four linked architecture progressions                        |
| `/workflow`                          | Product and Git delivery workflow                            |
| `/glossary`                          | Searchable term index                                        |
| `/contribute`                        | Open-source participation guide                              |
| `/open-source`                       | Open Source curriculum, exercise, workflow, and checklist    |
| `/open-source/[...slug]`             | Git, GitHub, collaboration, reference, and practice lessons  |

## Client state

`zero-to-hero-progress-v1` in localStorage stores completed and bookmarked lesson IDs, project slugs, Open Source checklist IDs, selected tracks, completed quests, and exercises. Older records receive empty defaults for new fields. The UI works when storage is unavailable; progress stays on the current device and is not an account or cloud backup. Local state is parsed defensively and updates subscribers in the same tab.

## Visual system

Editorial developer documentation: off-white background, ink text, blue actions matching the supplied logo, muted borders, Geist Sans and Mono. The exact user-supplied `public/logo.png` appears in navigation, footer, branded sections, and social metadata. Components use semantic HTML, visible focus, short motion with reduced-motion support, and content-first mobile layouts.

## Deployment

The project is Vercel-compatible but can run on any Next.js host. No external service is required to build or preview. The public GitHub URL is linked from the Contribute page and can be displayed in the header through `NEXT_PUBLIC_REPOSITORY_URL`.
