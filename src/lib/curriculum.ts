export type Lesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  readingMinutes: number;
  headings: { id: string; title: string }[];
};

export type Level = {
  slug: string;
  number: string;
  title: string;
  short: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  checkpoint: string;
  topics: string[];
  project?: string;
  lessons: Lesson[];
};

export const levels: Level[] = [
  {
    slug: "foundations",
    number: "00",
    title: "Foundations",
    short: "Understand the machine and the web",
    description:
      "Files, terminal, Git, browsers, requests, and the vocabulary behind every web application.",
    difficulty: "Beginner",
    checkpoint: "Explain a browser request and publish a first page.",
    topics: ["Files & folders", "Terminal", "Git", "HTTP", "DNS", "JSON"],
    project: "portfolio",
    lessons: [
      {
        id: "foundations/how-the-web-works",
        slug: "how-the-web-works",
        title: "How the web works",
        summary:
          "Trace one page load from URL to pixels, then inspect it in DevTools.",
        readingMinutes: 9,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "the-request", title: "The request" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
  {
    slug: "html",
    number: "01",
    title: "HTML",
    short: "Give content meaning",
    description:
      "Build documents that remain useful before CSS or JavaScript loads.",
    difficulty: "Beginner",
    checkpoint: "Build a navigable, semantic portfolio with labeled controls.",
    topics: [
      "Document structure",
      "Semantics",
      "Forms",
      "Accessibility",
      "Metadata",
    ],
    project: "portfolio",
    lessons: [
      {
        id: "html/semantic-page",
        slug: "semantic-page",
        title: "A page with a clear structure",
        summary: "Choose elements by purpose and make a complete page outline.",
        readingMinutes: 11,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "a-useful-document", title: "A useful document" },
          { id: "common-mistakes", title: "Common mistakes" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
  {
    slug: "css",
    number: "02",
    title: "CSS",
    short: "Design across screen sizes",
    description:
      "Use the cascade, box model, Flexbox, and Grid to build resilient layouts.",
    difficulty: "Beginner",
    checkpoint:
      "Ship a responsive page with readable type and visible keyboard focus.",
    topics: ["Cascade", "Box model", "Flexbox", "Grid", "Responsive design"],
    project: "portfolio",
    lessons: [
      {
        id: "css/layout-with-intent",
        slug: "layout-with-intent",
        title: "Layout with intent",
        summary:
          "Make a card grid adapt to content rather than a list of devices.",
        readingMinutes: 10,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "from-one-column", title: "From one column" },
          { id: "debugging", title: "Debugging" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
  {
    slug: "javascript",
    number: "03",
    title: "JavaScript",
    short: "Make interfaces respond",
    description:
      "Learn functions, data, the DOM, events, asynchronous requests, and error states.",
    difficulty: "Beginner",
    checkpoint:
      "Build a task list that handles empty input and persists after reload.",
    topics: [
      "Functions",
      "Arrays & objects",
      "DOM",
      "Events",
      "Fetch",
      "Async",
    ],
    project: "task-manager",
    lessons: [
      {
        id: "javascript/state-and-events",
        slug: "state-and-events",
        title: "State, events, and the DOM",
        summary: "Connect a user action to data and an updated interface.",
        readingMinutes: 12,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "one-source-of-truth", title: "One source of truth" },
          { id: "events", title: "Events" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
  {
    slug: "typescript",
    number: "04",
    title: "TypeScript",
    short: "Make assumptions explicit",
    description:
      "Model the data that crosses function and API boundaries without confusing types with validation.",
    difficulty: "Intermediate",
    checkpoint: "Build a typed API client and reject malformed runtime data.",
    topics: ["Types", "Unions", "Narrowing", "Generics", "Runtime validation"],
    project: "task-manager",
    lessons: [
      {
        id: "typescript/types-at-boundaries",
        slug: "types-at-boundaries",
        title: "Types at boundaries",
        summary:
          "Use types to make data assumptions visible and validate what arrives at runtime.",
        readingMinutes: 10,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "a-contract", title: "A contract" },
          { id: "runtime-is-different", title: "Runtime is different" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
  {
    slug: "react",
    number: "05",
    title: "React",
    short: "Compose maintainable interfaces",
    description:
      "Components, props, state, forms, and data loading as a coherent UI model.",
    difficulty: "Intermediate",
    checkpoint:
      "Build a task manager with clear ownership of state and accessible controls.",
    topics: ["Components", "Props", "State", "Effects", "Forms", "Composition"],
    project: "task-manager",
    lessons: [
      {
        id: "react/owning-state",
        slug: "owning-state",
        title: "Who owns this state?",
        summary:
          "Place state where the components that need it can use it without duplication.",
        readingMinutes: 10,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "state-and-props", title: "State and props" },
          { id: "common-mistakes", title: "Common mistakes" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
  {
    slug: "nextjs",
    number: "06",
    title: "Next.js",
    short: "Connect server and client",
    description:
      "Routing, Server Components, Client Components, data, metadata, and deployment.",
    difficulty: "Intermediate",
    checkpoint: "Build a routed app and justify every client-side boundary.",
    topics: [
      "App Router",
      "Server Components",
      "Client Components",
      "Metadata",
      "Caching",
    ],
    project: "auth-app",
    lessons: [
      {
        id: "nextjs/server-client-boundary",
        slug: "server-client-boundary",
        title: "The server–client boundary",
        summary:
          "Decide what belongs on the server and what truly needs browser JavaScript.",
        readingMinutes: 12,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "server-by-default", title: "Server by default" },
          { id: "browser-interaction", title: "Browser interaction" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
  {
    slug: "backend",
    number: "07",
    title: "Backend",
    short: "Protect the rules of the product",
    description:
      "HTTP, routes, validation, services, authentication, authorization, and error handling.",
    difficulty: "Intermediate",
    checkpoint:
      "Build CRUD routes that reject invalid input and unauthorized actions.",
    topics: ["HTTP", "REST", "CRUD", "Validation", "Auth", "Logging"],
    project: "auth-app",
    lessons: [
      {
        id: "backend/request-to-service",
        slug: "request-to-service",
        title: "From request to service",
        summary:
          "Trace a request through routing, validation, business logic, and response.",
        readingMinutes: 11,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "the-boundaries", title: "The boundaries" },
          { id: "failure-paths", title: "Failure paths" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
  {
    slug: "databases",
    number: "08",
    title: "Databases",
    short: "Model durable data",
    description:
      "PostgreSQL, relationships, constraints, indexes, transactions, and migrations.",
    difficulty: "Intermediate",
    checkpoint: "Design and query a schema that protects its own invariants.",
    topics: [
      "SQL",
      "Relations",
      "Constraints",
      "Indexes",
      "Transactions",
      "Migrations",
    ],
    project: "saas",
    lessons: [
      {
        id: "databases/modeling-data",
        slug: "modeling-data",
        title: "Model data before choosing an ORM",
        summary: "Turn product rules into tables, keys, and constraints.",
        readingMinutes: 11,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "from-rule-to-schema", title: "From rule to schema" },
          { id: "why-constraints-matter", title: "Why constraints matter" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
  {
    slug: "production",
    number: "09",
    title: "Production",
    short: "Make features reliable",
    description:
      "Tests, logs, monitoring, secrets, performance, queues, storage, and failure recovery.",
    difficulty: "Advanced",
    checkpoint:
      "Prove a core flow works, fails clearly, and is observable after release.",
    topics: ["Testing", "Secrets", "Monitoring", "Performance", "Queues"],
    project: "saas",
    lessons: [
      {
        id: "production/reliable-features",
        slug: "reliable-features",
        title: "A feature is more than its happy path",
        summary:
          "Define failure behavior, tests, and the signal that tells you when it breaks.",
        readingMinutes: 10,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "a-testable-contract", title: "A testable contract" },
          { id: "after-release", title: "After release" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
  {
    slug: "devops",
    number: "10",
    title: "DevOps",
    short: "Ship and observe changes",
    description:
      "Branches, pull requests, CI, builds, previews, deployment, logs, and rollback.",
    difficulty: "Advanced",
    checkpoint:
      "Ship through a reviewed pull request and explain the rollback path.",
    topics: ["Git workflow", "CI/CD", "Preview", "DNS", "HTTPS", "Rollback"],
    project: "saas",
    lessons: [
      {
        id: "devops/from-pr-to-production",
        slug: "from-pr-to-production",
        title: "From pull request to production",
        summary:
          "Follow one change through review, checks, preview, release, and monitoring.",
        readingMinutes: 10,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "the-release-path", title: "The release path" },
          { id: "when-it-breaks", title: "When it breaks" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
  {
    slug: "architecture",
    number: "11",
    title: "Architecture",
    short: "Make boundaries explainable",
    description:
      "Trace user flows through systems, data, caching, queues, and service boundaries.",
    difficulty: "Advanced",
    checkpoint: "Draw a request flow and explain why each component exists.",
    topics: ["Boundaries", "Data flow", "Tradeoffs", "Caching", "Queues"],
    project: "saas",
    lessons: [
      {
        id: "architecture/growing-a-system",
        slug: "growing-a-system",
        title: "Grow a system one need at a time",
        summary:
          "Add architectural parts only when a user flow or operational need justifies them.",
        readingMinutes: 11,
        headings: [
          { id: "the-problem", title: "The problem" },
          { id: "four-stages", title: "Four stages" },
          { id: "tradeoffs", title: "Tradeoffs" },
          { id: "practice", title: "Practice" },
          { id: "checkpoint", title: "Checkpoint" },
        ],
      },
    ],
  },
];

export const lessons = levels.flatMap((level) =>
  level.lessons.map((lesson) => ({
    ...lesson,
    levelSlug: level.slug,
    levelTitle: level.title,
    levelNumber: level.number,
  })),
);

export function getLesson(levelSlug: string, lessonSlug: string) {
  return lessons.find(
    (lesson) => lesson.levelSlug === levelSlug && lesson.slug === lessonSlug,
  );
}

export function getLevel(slug: string) {
  return levels.find((level) => level.slug === slug);
}
