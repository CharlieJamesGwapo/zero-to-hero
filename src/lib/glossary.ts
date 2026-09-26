export type Term = {
  slug: string;
  term: string;
  definition: string;
  detail: string;
  lesson: string;
};

export const glossary: Term[] = [
  {
    slug: "api",
    term: "API",
    definition:
      "A defined way for software components to request data or actions from each other.",
    detail:
      "A web API exposes routes with documented inputs and responses. Its contract matters more than the language used behind it.",
    lesson: "/learn/backend/request-to-service",
  },
  {
    slug: "backend",
    term: "Backend",
    definition: "Code that handles requests and product rules on a server.",
    detail:
      "It validates input, enforces permissions, coordinates data access, and returns responses. It is not simply any code that runs outside a browser.",
    lesson: "/learn/backend/request-to-service",
  },
  {
    slug: "cache",
    term: "Cache",
    definition:
      "A stored copy of data or a result used to avoid repeated work.",
    detail:
      "Caching improves speed when the data can safely be reused. The hard part is deciding when the copy becomes stale.",
    lesson: "/learn/architecture/growing-a-system",
  },
  {
    slug: "cdn",
    term: "CDN",
    definition: "A network that serves assets from locations closer to users.",
    detail:
      "A CDN can reduce latency for images and static files, but cache behavior and invalidation still need to be understood.",
    lesson: "/learn/architecture/growing-a-system",
  },
  {
    slug: "ci-cd",
    term: "CI/CD",
    definition:
      "Automated checks and delivery steps connected to code changes.",
    detail:
      "Continuous integration verifies proposed work. Delivery or deployment moves a tested revision toward users with a visible result.",
    lesson: "/learn/devops/from-pr-to-production",
  },
  {
    slug: "cookie",
    term: "Cookie",
    definition:
      "A small value a server asks a browser to store and send on later requests.",
    detail:
      "Cookies can carry a session identifier. Attributes such as HttpOnly, Secure, and SameSite affect how they are sent and accessed.",
    lesson: "/learn/backend/request-to-service",
  },
  {
    slug: "dns",
    term: "DNS",
    definition: "The system that maps domain names to network addresses.",
    detail:
      "A browser uses DNS before connecting to a website by name. DNS records are part of domain and deployment setup.",
    lesson: "/learn/foundations/how-the-web-works",
  },
  {
    slug: "dom",
    term: "DOM",
    definition: "The browser's structured representation of a web document.",
    detail:
      "JavaScript can use DOM APIs to read elements, respond to events, and update visible content.",
    lesson: "/learn/javascript/state-and-events",
  },
  {
    slug: "http",
    term: "HTTP",
    definition: "The request-and-response protocol used by the web.",
    detail:
      "An HTTP request includes a method and target; a response includes a status, headers, and often a body.",
    lesson: "/learn/foundations/how-the-web-works",
  },
  {
    slug: "https",
    term: "HTTPS",
    definition: "HTTP carried over an encrypted TLS connection.",
    detail:
      "HTTPS protects data in transit and lets the browser verify the server identity through a certificate.",
    lesson: "/learn/foundations/how-the-web-works",
  },
  {
    slug: "jwt",
    term: "JWT",
    definition: "A compact token format for carrying signed claims.",
    detail:
      "A JWT is not an authentication system by itself. Its claims, expiry, storage, and verification must be designed carefully.",
    lesson: "/learn/backend/request-to-service",
  },
  {
    slug: "orm",
    term: "ORM",
    definition: "A library that maps application code to database operations.",
    detail:
      "An ORM can reduce repetitive queries, but understanding SQL, constraints, and query performance remains essential.",
    lesson: "/learn/databases/modeling-data",
  },
  {
    slug: "rest",
    term: "REST",
    definition: "A style for resource-oriented web APIs using HTTP semantics.",
    detail:
      "A practical REST API gives routes predictable methods, status codes, and representations.",
    lesson: "/learn/backend/request-to-service",
  },
  {
    slug: "sql",
    term: "SQL",
    definition: "A language for defining and querying relational data.",
    detail:
      "SQL expresses reads, writes, relationships, constraints, and transactions in a relational database.",
    lesson: "/learn/databases/modeling-data",
  },
  {
    slug: "ssr",
    term: "SSR",
    definition: "Rendering HTML on a server for a request.",
    detail:
      "Server rendering can deliver content before browser JavaScript runs; it does not remove the need to decide where interactions live.",
    lesson: "/learn/nextjs/server-client-boundary",
  },
  {
    slug: "csr",
    term: "CSR",
    definition: "Rendering or updating interface content in the browser.",
    detail:
      "Client rendering supports interaction but sends work and JavaScript to the user's device.",
    lesson: "/learn/nextjs/server-client-boundary",
  },
  {
    slug: "tls",
    term: "TLS",
    definition: "The protocol used to secure connections such as HTTPS.",
    detail:
      "TLS helps protect data in transit and authenticates a server using certificates.",
    lesson: "/learn/foundations/how-the-web-works",
  },
  {
    slug: "websocket",
    term: "WebSocket",
    definition: "A persistent two-way connection between browser and server.",
    detail:
      "WebSockets suit updates that must arrive without a new HTTP request. They add connection and scaling concerns, so use them when needed.",
    lesson: "/learn/architecture/growing-a-system",
  },
  {
    slug: "repository",
    term: "Repository",
    definition: "A project and its recorded Git history.",
    detail:
      "A repository can live locally or on a remote host. Its working files and Git metadata serve different purposes.",
    lesson: "/open-source/git/repository",
  },
  {
    slug: "fork",
    term: "Fork",
    definition:
      "A copy of a repository under another GitHub account or organization.",
    detail:
      "A fork lets you push a proposed change without write access to the original repository.",
    lesson: "/open-source/forks",
  },
  {
    slug: "clone",
    term: "Clone",
    definition: "A local copy of a Git repository and its history.",
    detail:
      "Cloning usually configures the source URL as the remote named origin.",
    lesson: "/open-source/github/remote",
  },
  {
    slug: "remote",
    term: "Remote",
    definition: "A named address for another Git repository.",
    detail:
      "Fetch receives its history and push sends your commits when permissions allow.",
    lesson: "/open-source/git/remote",
  },
  {
    slug: "origin",
    term: "Origin",
    definition:
      "A conventional name for the remote a repository was cloned from.",
    detail:
      "Origin is only a name; inspect its URL before fetching or pushing, especially after a fork.",
    lesson: "/open-source/git/remote",
  },
  {
    slug: "branch",
    term: "Branch",
    definition: "A movable name for a commit and a line of work.",
    detail:
      "Feature branches isolate proposed changes from the shared main branch until review and integration.",
    lesson: "/open-source/git/branches",
  },
  {
    slug: "commit",
    term: "Commit",
    definition:
      "A recorded project state with a message, author, and parent history.",
    detail:
      "A commit contains staged changes and remains local until its branch is pushed.",
    lesson: "/open-source/git/commits",
  },
  {
    slug: "issue",
    term: "Issue",
    definition: "A tracked problem, task, or proposal in a project.",
    detail:
      "Useful issues describe the current problem, desired outcome, and acceptance criteria.",
    lesson: "/open-source/github/issues",
  },
  {
    slug: "pull-request",
    term: "Pull request",
    definition: "A proposal to integrate commits from one branch into another.",
    detail:
      "It combines a diff, discussion, checks, and review before a maintainer decides whether to merge.",
    lesson: "/open-source/first-pull-request",
  },
  {
    slug: "review",
    term: "Review",
    definition:
      "A structured check of a proposed change by another contributor.",
    detail:
      "Reviewers examine correctness, clarity, security, testing, performance, and accessibility with specific feedback.",
    lesson: "/open-source/code-review",
  },
  {
    slug: "maintainer",
    term: "Maintainer",
    definition:
      "A person responsible for the direction and upkeep of a project.",
    detail:
      "Maintainers triage issues, review changes, document decisions, and manage releases within their available time.",
    lesson: "/open-source/maintaining",
  },
  {
    slug: "contributor",
    term: "Contributor",
    definition:
      "Someone who improves a project through code, content, design, testing, or support.",
    detail:
      "A contribution is proposed through the process the project documents; it may be revised before acceptance.",
    lesson: "/open-source/first-contribution",
  },
  {
    slug: "release",
    term: "Release",
    definition: "A published version of a project at a known revision.",
    detail:
      "Release notes explain user-visible changes; the release may also be tagged and deployed.",
    lesson: "/open-source/releases",
  },
  {
    slug: "tag",
    term: "Tag",
    definition: "A Git name attached to a particular commit.",
    detail:
      "Projects often use tags to identify releases, but a tag alone does not deploy software.",
    lesson: "/open-source/releases",
  },
  {
    slug: "ci",
    term: "CI",
    definition: "Automated integration checks triggered by code changes.",
    detail:
      "CI can run lint, types, tests, and builds for a proposed revision before review or merge.",
    lesson: "/open-source/ci",
  },
  {
    slug: "cd",
    term: "CD",
    definition: "Automated delivery or deployment of tested revisions.",
    detail:
      "Teams define how a verified change reaches staging or production and how to recover when it fails.",
    lesson: "/learn/devops/from-pr-to-production",
  },
  {
    slug: "license",
    term: "License",
    definition:
      "Terms that grant permissions and set conditions for using a work.",
    detail:
      "A public code repository does not automatically give blanket permission to reuse its code or assets.",
    lesson: "/open-source/licenses",
  },
  {
    slug: "changelog",
    term: "Changelog",
    definition: "A record of notable changes across project versions.",
    detail:
      "A useful changelog explains what changed for users rather than copying raw commit messages.",
    lesson: "/open-source/releases",
  },
  {
    slug: "semantic-versioning",
    term: "Semantic versioning",
    definition: "A version convention using MAJOR.MINOR.PATCH numbers.",
    detail:
      "Its meaning depends on a public API and the project's stated release policy; not every project adopts it.",
    lesson: "/open-source/releases",
  },
  {
    slug: "merge-conflict",
    term: "Merge conflict",
    definition: "A change combination Git cannot choose automatically.",
    detail:
      "Read both edits, write the intended result, remove markers, and verify the resolved behavior.",
    lesson: "/open-source/git/merge-conflicts",
  },
];
