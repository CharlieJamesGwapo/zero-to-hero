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
];
