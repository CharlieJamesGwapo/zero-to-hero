# Contributing to ZERO → HERO

A useful contribution can be a clearer sentence, a tested code example, a repaired link, an accessibility fix, or a focused feature. You do not need to be an expert.

## Before you edit

1. Search [issues](https://github.com/CharlieJamesGwapo/zero-to-hero/issues) and pull requests for the same problem.
2. For a small correction, open a pull request directly. For a new lesson group or large architecture change, open an issue first and describe the learner problem.
3. Keep the proposal small enough to review and verify.

## Local setup

```bash
git clone https://github.com/YOUR-USERNAME/zero-to-hero.git
cd zero-to-hero
npm ci
npm run dev
```

Replace `YOUR-USERNAME` with your GitHub username after forking. Open `http://localhost:3000` and navigate to the page you plan to change. No secrets or external services are required for the site itself.

Before opening a pull request, run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run format:check
```

## Improve a lesson

- Main web-development lessons live in `content/<level>/<lesson>.mdx`, with metadata in `src/lib/curriculum.ts` and a static import in `src/lib/lesson-content.tsx`.
- Open Source lessons live in `content/open-source/`, with route and summary metadata in `src/lib/open-source.ts` and imports in `src/lib/open-source-content.tsx`.
- Keep the explanation focused: problem, concept, example, how it works, common mistakes, practice, and checkpoint. The Open Source reader uses those headings for its contents navigation.
- Verify commands in a disposable repository. Do not show destructive Git commands without explaining their effect. Link real GitHub pages instead of inventing issue numbers or statistics.
- A new Open Source route must also be included in the stage or workflow map when it belongs there. Run the content tests to catch missing files and links.

## Improve a project or guide

Project briefs live in `src/lib/projects.ts`. State behavior a user can observe, a failure case, and how to verify it. Architecture and workflow pages live under `src/app/`; every diagram node should lead to a relevant lesson.

## Improve the interface

Use semantic HTML, keyboard navigation, visible focus, readable contrast, and a narrow-screen layout. Check the homepage, curriculum, lesson reader, search, and mobile navigation when a shared style changes. Avoid adding a dependency when a small component or browser feature solves the problem.

## Pull requests

Describe what changed, why it helps learners, and what you checked. Link an issue if there is one. Include before and after screenshots for visual changes. Do not include secrets, personal data, or third-party course material you cannot license.

Security concerns should use the private path in [SECURITY.md](SECURITY.md), not a public issue. By participating, you agree to the [Code of Conduct](CODE_OF_CONDUCT.md). Contributions are licensed under the repository's MIT license.
