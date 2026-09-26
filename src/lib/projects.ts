export type Project = {
  slug: string;
  number: string;
  title: string;
  description: string;
  stack: string[];
  level: string;
  brief: string;
  requirements: string[];
  milestones: string[];
  review: string[];
};

export const projects: Project[] = [
  {
    slug: "portfolio",
    number: "01",
    title: "Personal portfolio",
    level: "Foundation",
    description:
      "A fast, accessible site that communicates who you are and what you have built.",
    stack: ["HTML", "CSS", "JavaScript"],
    brief:
      "A visitor should understand your work, open a project, and find a contact method without hunting through the page.",
    requirements: [
      "Semantic page structure and descriptive links",
      "Responsive layout with readable type",
      "Two real project explanations with your role",
      "Keyboard-accessible navigation and visible focus",
      "A working contact link; no fake submission state",
    ],
    milestones: [
      "Write content and HTML without styling",
      "Apply a small CSS system",
      "Test at narrow widths and 200% zoom",
      "Publish and ask someone to find your best project",
    ],
    review: [
      "Can a stranger identify your role in ten seconds?",
      "Are project links and images working?",
      "Does every control work with a keyboard?",
    ],
  },
  {
    slug: "task-manager",
    number: "02",
    title: "Task manager",
    level: "Frontend",
    description:
      "A compact application where state, forms, filtering, and persistence have clear ownership.",
    stack: ["React", "TypeScript"],
    brief:
      "A user should capture work, mark it done, filter it, and return later without losing local tasks.",
    requirements: [
      "Create, edit, complete, and delete tasks",
      "Validate empty and excessively long titles",
      "Filter all, open, and complete tasks",
      "Persist locally and explain that storage is device-specific",
      "Show useful empty states and an accessible status message",
    ],
    milestones: [
      "Model a typed task",
      "Build the form and list with local state",
      "Add actions and filtering",
      "Persist data and test corrupted storage",
      "Review keyboard flow and document limitations",
    ],
    review: [
      "Is there one source of truth for tasks?",
      "Does refresh preserve data?",
      "Can a keyboard user finish the main flow?",
    ],
  },
  {
    slug: "auth-app",
    number: "03",
    title: "Authentication application",
    level: "Full-stack",
    description:
      "A private workspace that proves the difference between sign-in and permission checks.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    brief:
      "A signed-in user can manage their own notes. An ordinary user cannot read or change another user's notes, even by editing a URL or request.",
    requirements: [
      "Use a maintained authentication solution",
      "Store user-owned records in PostgreSQL",
      "Check authorization on every protected operation",
      "Validate inputs on the server",
      "Provide clear loading, empty, and error states",
    ],
    milestones: [
      "Write the request and data model",
      "Add sign-in and sign-out",
      "Implement private CRUD",
      "Test cross-user access",
      "Deploy with secrets stored only on the server",
    ],
    review: [
      "Does the server reject a cross-user request?",
      "Are secrets absent from source and client bundles?",
      "Are errors safe and understandable?",
    ],
  },
  {
    slug: "commerce",
    number: "04",
    title: "Commerce platform",
    level: "Application",
    description:
      "A catalog, cart, checkout, and order flow that treats payment state as a system boundary.",
    stack: ["Next.js", "PostgreSQL", "Payments"],
    brief:
      "A buyer can find a product, review a cart, place an order through a hosted payment flow, and see a truthful order status.",
    requirements: [
      "Catalog and search",
      "Cart with quantity and price checks on the server",
      "Hosted checkout with a test provider",
      "Webhook validation and idempotent order updates",
      "Admin view for order management",
      "Refund and failure states documented",
    ],
    milestones: [
      "Model products, carts, orders, and payments",
      "Implement catalog and cart",
      "Integrate test checkout",
      "Handle duplicate and failed webhooks",
      "Test the complete order lifecycle",
    ],
    review: [
      "Can the client change a price?",
      "Do duplicate webhooks create duplicate orders?",
      "Is an unpaid order ever labeled paid?",
    ],
  },
  {
    slug: "saas",
    number: "05",
    title: "SaaS application",
    level: "Capstone",
    description:
      "An organization-based product with roles, billing, operations, and a defensible architecture.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Background jobs"],
    brief:
      "Choose one narrow business problem. Organizations manage their own data; roles govern access; billing and background work support the core user flow.",
    requirements: [
      "Written requirements and user flows",
      "Architecture and database diagrams",
      "Organization-scoped authorization",
      "Server-side validation and audited critical actions",
      "Billing integration in test mode",
      "Email or file upload where the product needs it",
      "Automated tests, CI, deployment, logs, and an incident response note",
    ],
    milestones: [
      "Define the smallest useful release",
      "Review architecture and data model",
      "Ship one vertical slice",
      "Add permissions and operational checks",
      "Test failure paths and deploy",
      "Collect feedback and document a measured next step",
    ],
    review: [
      "Can every component be justified by a user or operational need?",
      "Can one organization access another's data?",
      "What signal reveals a broken core flow?",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
