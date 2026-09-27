# Learning platform architecture

## Routes and content

- `/learn` is a local dashboard. Selected tracks, completed stages, saved lessons, quests, exercises, and projects are stored in the existing `zero-to-hero-progress-v1` localStorage record. New arrays default to empty when older data is loaded.
- `/tracks/[track]` and `/tracks/[track]/[stage]` use typed content in `content/tracks/paths.ts`. A stage has a unique slug, explanation, runnable example, and practice prompt. The existing web curriculum and open-source lessons remain in their original MDX routes.
- `/quests` and `/exercises` use `src/lib/challenges.ts`. Each item defines objective, language, difficulty, topic, time, instructions, starter, visible checks, hints, solution, related lesson, and execution mode. `validateChallenges` checks required fields, unique slugs, and runnable checks. Add content there, then run `npm test`.
- `/playground` uses `src/lib/playground.ts` for language configuration and `CodeWorkbench` for the editor, run state, output, and test feedback.

## Code execution

User code never runs in the Next.js server or production Node process.

- JavaScript runs in a new browser Web Worker. The worker is terminated after each run and after a five-second timeout. Console output is capped.
- TypeScript is transpiled on demand in the browser with the TypeScript compiler, then runs in the same disposable worker. This editor supports TypeScript syntax but is **not** a full project type checker.
- Python loads pinned Pyodide 0.29.1 from jsDelivr inside a module Web Worker only when run. The worker is terminated after each run or a 45-second timeout. The first run requires a network download and can take longer.
- HTML/CSS renders in a sandboxed iframe with scripts disabled and a restrictive Content Security Policy.
- C++ and SQL have no browser runtime in this release. Their exercises direct the learner to a local compiler or database and use an explicit self-check.

Browser workers keep execution off the main UI thread and away from the server, but they are not a general-purpose hostile-code sandbox. Do not put secrets in browser code. If remote multi-user code execution is added, build a separate isolated service with resource and network limits.

All automated challenge checks are visible. A client-only app cannot keep hidden checks secret from a learner who inspects downloaded code. Do not label browser-side checks as hidden.

## Add a learning item

1. Write an outcome the learner can observe.
2. Add an example or starter that is accurate for its runtime.
3. Add at least one visible check for a runnable exercise or quest. For project and local modes, provide steps and a review guide instead.
4. Link to a prerequisite lesson or project.
5. Run lint, typecheck, tests, build, and a browser check of the new route.

Keep explanations specific, examples small, and limitations explicit. All core educational routes remain public.
