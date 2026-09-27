import type { Language } from "./playground";

export const lessonPractice: Record<
  string,
  {
    language?: Language;
    code?: string;
    exercise: string;
    exerciseLabel: string;
  }
> = {
  "foundations/how-the-web-works": {
    exercise: "/quests/hello-world",
    exerciseLabel: "Run your first program",
  },
  "html/semantic-page": {
    language: "html",
    code: "<article>\n  <h1>My project</h1>\n  <p>Describe what you built.</p>\n</article>",
    exercise: "/exercises/semantic-card",
    exerciseLabel: "Build a semantic card",
  },
  "css/layout-with-intent": {
    language: "html",
    code: '<style>\n  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }\n</style>\n<div class="cards"><article>One</article><article>Two</article><article>Three</article></div>',
    exercise: "/exercises/semantic-card",
    exerciseLabel: "Style a semantic card",
  },
  "javascript/state-and-events": {
    language: "javascript",
    code: 'const tasks = [{ title: "Study", done: false }];\nconsole.log(tasks.filter(task => !task.done));',
    exercise: "/exercises/reverse-string",
    exerciseLabel: "Practice JavaScript functions",
  },
  "typescript/types-at-boundaries": {
    language: "typescript",
    code: 'type User = { name: string };\nconst user: User = { name: "Ada" };\nconsole.log(user.name);',
    exercise: "/exercises/fizzbuzz",
    exerciseLabel: "Practice typed functions",
  },
  "react/owning-state": {
    exercise: "/quests/todo-list",
    exerciseLabel: "Model todo state",
  },
  "nextjs/server-client-boundary": {
    exercise: "/quests/rest-api",
    exerciseLabel: "Plan a server API",
  },
  "backend/request-to-service": {
    exercise: "/quests/rest-api",
    exerciseLabel: "Build a REST API",
  },
  "databases/modeling-data": {
    exercise: "/exercises/sql-filter",
    exerciseLabel: "Write a SQL query",
  },
  "production/reliable-features": {
    exercise: "/quests/deploy",
    exerciseLabel: "Verify a release",
  },
  "devops/from-pr-to-production": {
    exercise: "/quests/deploy",
    exerciseLabel: "Deploy an application",
  },
  "architecture/growing-a-system": {
    exercise: "/quests/authentication",
    exerciseLabel: "Map an auth boundary",
  },
};
