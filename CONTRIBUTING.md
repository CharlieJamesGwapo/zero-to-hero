# Contributing to ZERO → HERO

Clear explanations and small corrections are valuable. You do not need to be an expert to report a confusing step.

## Before you edit

1. Search existing issues and pull requests.
2. For a small correction, open a pull request directly. For a new level or large architecture change, open an issue first and describe the learner problem.
3. Keep one change focused enough to review.

## Local setup

```bash
npm install
npm run dev
```

Before opening a pull request, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Add or improve a lesson

1. Edit or create `content/<level>/<lesson>.mdx`.
2. Use the focused sequence: problem, concept, example, how it works, common mistakes, practice, build, checkpoint.
3. For a new lesson, add its metadata and order to `src/lib/curriculum.ts` and import it in `src/lib/lesson-content.tsx`.
4. Verify code examples, lesson links, headings, and the adjacent lesson navigation.
5. Prefer a concrete example over general advice. Explain why the concept exists and where it appears in a real project.

## Improve a project or guide

Project briefs live in `src/lib/projects.ts`. Requirements should describe behavior a user or reviewer can observe. Include failure cases and a check that proves a milestone works. Architecture and workflow pages live under `src/app/`; every diagram node should link to a useful explanation.

## Improve the interface

Use semantic HTML, visible keyboard focus, readable contrast, and a narrow-screen layout. Check with a keyboard and at least one mobile viewport. Avoid adding a dependency when the platform or a small component will do.

## Pull requests

Describe what changed and why, link the issue if there is one, list checks run, and include screenshots for visual changes. Do not include secrets, personal data, or copyrighted third-party course material.

By participating, you agree to the [Code of Conduct](CODE_OF_CONDUCT.md). Contributions are licensed under the repository's MIT license.
