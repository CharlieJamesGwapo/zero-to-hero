import type { Language } from "./playground";
import type { VisibleTest } from "@/components/code-workbench";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Challenge = {
  slug: string;
  title: string;
  language: Language | "sql";
  difficulty: Difficulty;
  topic: string;
  minutes: number;
  objective: string;
  instructions: string[];
  starter: string;
  tests: VisibleTest[];
  hints: string[];
  solution: string;
  explanation: string;
  relatedLesson: { label: string; href: string };
  mode?: "local" | "project";
  projectHref?: string;
};

export type Quest = Challenge & {
  number: string;
  category: string;
  prerequisites: string[];
  concepts: string[];
  nextQuest?: string;
};

export const exercises: Challenge[] = [
  {
    slug: "favorite-language",
    title: "Create a language variable",
    language: "javascript",
    difficulty: "Beginner",
    topic: "Variables",
    minutes: 5,
    objective:
      "Store a programming language in a named variable that other code can read.",
    instructions: [
      "Create a variable named favoriteLanguage.",
      "Give it a nonempty string value.",
      "The visible check reads the variable.",
    ],
    starter: "// Create favoriteLanguage here.\n",
    tests: [
      {
        label: "A named language",
        invocation:
          "console.log(typeof favoriteLanguage === 'string' && favoriteLanguage.length > 0);",
        expected: "true",
      },
    ],
    hints: [
      "Use const to declare a value that will not be reassigned.",
      'Example: const favoriteLanguage = "JavaScript";',
    ],
    solution: 'const favoriteLanguage = "JavaScript";',
    explanation:
      "A variable gives a value a reusable name. Try changing the string to a language you want to learn.",
    relatedLesson: {
      label: "Programming fundamentals: variables",
      href: "/tracks/fundamentals/variables",
    },
  },
  {
    slug: "reverse-string",
    title: "Reverse a string",
    language: "javascript",
    difficulty: "Beginner",
    topic: "Strings",
    minutes: 10,
    objective: "Write a function that returns a string in reverse order.",
    instructions: [
      "Return a new string; do not print it.",
      "Check ordinary input, one character, and an empty string.",
    ],
    starter:
      "function reverseString(value) {\n  // Return the reversed text.\n}",
    tests: [
      {
        label: '"hello" → "olleh"',
        invocation: 'console.log(reverseString("hello"));',
        expected: "olleh",
      },
      {
        label: '"abc" → "cba"',
        invocation: 'console.log(reverseString("abc"));',
        expected: "cba",
      },
      {
        label: '"" → ""',
        invocation: 'console.log(reverseString(""));',
        expected: "",
      },
    ],
    hints: [
      "A string can be turned into an array of characters.",
      "Try split, reverse, then join.",
    ],
    solution:
      'function reverseString(value) {\n  return value.split("").reverse().join("");\n}',
    explanation:
      "split makes characters addressable as an array; reverse changes their order; join returns a string. This takes O(n) time and O(n) extra space.",
    relatedLesson: {
      label: "JavaScript state and events",
      href: "/learn/javascript/state-and-events",
    },
  },
  {
    slug: "largest-number",
    title: "Find the largest number",
    language: "javascript",
    difficulty: "Beginner",
    topic: "Arrays",
    minutes: 8,
    objective: "Return the largest value in a nonempty array of numbers.",
    instructions: [
      "Accept an array argument.",
      "Handle negative numbers correctly.",
    ],
    starter: "function largest(values) {\n  // Find the maximum.\n}",
    tests: [
      {
        label: "[2, 9, 4] → 9",
        invocation: "console.log(largest([2, 9, 4]));",
        expected: "9",
      },
      {
        label: "[-5, -2] → -2",
        invocation: "console.log(largest([-5, -2]));",
        expected: "-2",
      },
      {
        label: "[7] → 7",
        invocation: "console.log(largest([7]));",
        expected: "7",
      },
    ],
    hints: [
      "Start with the first element as your current largest.",
      "Compare each later number and update the current largest.",
    ],
    solution:
      "function largest(values) {\n  let max = values[0];\n  for (const value of values) if (value > max) max = value;\n  return max;\n}",
    explanation:
      "One pass visits every number once, so time is O(n) and extra space is O(1). Starting at zero would fail for an all-negative array.",
    relatedLesson: {
      label: "JavaScript state and events",
      href: "/learn/javascript/state-and-events",
    },
  },
  {
    slug: "count-vowels",
    title: "Count vowels",
    language: "javascript",
    difficulty: "Beginner",
    topic: "Strings",
    minutes: 10,
    objective: "Count a, e, i, o, and u in text, ignoring case.",
    instructions: ["Return a number.", "Do not count spaces or consonants."],
    starter: "function countVowels(text) {\n  // Count vowels.\n}",
    tests: [
      {
        label: "Hello → 2",
        invocation: 'console.log(countVowels("Hello"));',
        expected: "2",
      },
      {
        label: "AEIOU → 5",
        invocation: 'console.log(countVowels("AEIOU"));',
        expected: "5",
      },
      {
        label: "xyz → 0",
        invocation: 'console.log(countVowels("xyz"));',
        expected: "0",
      },
    ],
    hints: [
      "Convert the text to lowercase first.",
      "Check whether each character appears in 'aeiou'.",
    ],
    solution:
      'function countVowels(text) {\n  let count = 0;\n  for (const character of text.toLowerCase()) if ("aeiou".includes(character)) count++;\n  return count;\n}',
    explanation:
      "A single scan checks each character once. Time is O(n); the counter uses O(1) extra space.",
    relatedLesson: {
      label: "JavaScript state and events",
      href: "/learn/javascript/state-and-events",
    },
  },
  {
    slug: "fizzbuzz",
    title: "FizzBuzz",
    language: "typescript",
    difficulty: "Beginner",
    topic: "Conditions",
    minutes: 12,
    objective:
      "Return Fizz for multiples of 3, Buzz for 5, FizzBuzz for both, otherwise the number as text.",
    instructions: [
      "Use a typed number parameter and return a string.",
      "Check the combined case before individual cases.",
    ],
    starter:
      'function fizzBuzz(value: number): string {\n  // Your logic here.\n  return "";\n}',
    tests: [
      {
        label: "15 → FizzBuzz",
        invocation: "console.log(fizzBuzz(15));",
        expected: "FizzBuzz",
      },
      {
        label: "9 → Fizz",
        invocation: "console.log(fizzBuzz(9));",
        expected: "Fizz",
      },
      {
        label: "10 → Buzz",
        invocation: "console.log(fizzBuzz(10));",
        expected: "Buzz",
      },
      {
        label: "7 → 7",
        invocation: "console.log(fizzBuzz(7));",
        expected: "7",
      },
    ],
    hints: [
      "The remainder operator is %. A multiple gives remainder zero.",
      "Start with value % 15 === 0.",
    ],
    solution:
      'function fizzBuzz(value: number): string {\n  if (value % 15 === 0) return "FizzBuzz";\n  if (value % 3 === 0) return "Fizz";\n  if (value % 5 === 0) return "Buzz";\n  return String(value);\n}',
    explanation:
      "The order matters: checking 3 first would return Fizz for 15 before reaching the combined case. This uses constant time and space.",
    relatedLesson: {
      label: "Types at boundaries",
      href: "/learn/typescript/types-at-boundaries",
    },
  },
  {
    slug: "python-calculator",
    title: "Python calculator",
    language: "python",
    difficulty: "Beginner",
    topic: "Functions",
    minutes: 12,
    objective: "Write add(a, b) and print the sum of two numbers.",
    instructions: [
      "Return the result from the function.",
      "The checks print its return value.",
    ],
    starter: "def add(a, b):\n    # Return the sum.\n    pass",
    tests: [
      { label: "2 + 3 → 5", invocation: "print(add(2, 3))", expected: "5" },
      { label: "-4 + 1 → -3", invocation: "print(add(-4, 1))", expected: "-3" },
    ],
    hints: [
      "A Python function returns a value with return.",
      "Addition uses +.",
    ],
    solution: "def add(a, b):\n    return a + b",
    explanation:
      "The function takes two inputs and returns their sum. Returning makes the result reusable in other code.",
    relatedLesson: {
      label: "Python functions",
      href: "/tracks/python/functions",
    },
  },
  {
    slug: "normalize-email",
    title: "Normalize an email",
    language: "javascript",
    difficulty: "Intermediate",
    topic: "Validation",
    minutes: 15,
    objective: "Remove surrounding whitespace and lowercase an email string.",
    instructions: [
      "Return the normalized text.",
      "This is normalization, not full email validation.",
    ],
    starter: "function normalizeEmail(email) {\n  // Normalize the input.\n}",
    tests: [
      {
        label: "Mixed case and spaces",
        invocation: 'console.log(normalizeEmail("  Ada@Example.COM  "));',
        expected: "ada@example.com",
      },
      {
        label: "Already normalized",
        invocation: 'console.log(normalizeEmail("a@b.co"));',
        expected: "a@b.co",
      },
    ],
    hints: [
      "trim() removes whitespace at the edges.",
      "toLowerCase() handles case normalization.",
    ],
    solution:
      "function normalizeEmail(email) {\n  return email.trim().toLowerCase();\n}",
    explanation:
      "This reduces accidental duplicate entries; it does not prove the address is valid or deliverable. Time and extra space are O(n).",
    relatedLesson: {
      label: "Backend validation",
      href: "/learn/backend/request-to-service",
    },
  },
  {
    slug: "semantic-card",
    title: "Make a semantic card",
    language: "html",
    difficulty: "Beginner",
    topic: "HTML",
    minutes: 10,
    objective:
      "Build a readable article card with a heading, description, and descriptive link.",
    instructions: [
      "Use an article element.",
      "Keep the link text meaningful out of context.",
      "Run to inspect the isolated preview, then check the structure yourself.",
    ],
    starter:
      '<article>\n  <h2>My first project</h2>\n  <p>Explain what the project does.</p>\n  <a href="https://example.com">View my first project</a>\n</article>',
    tests: [],
    hints: ["HTML elements should describe the role of content."],
    solution:
      '<article>\n  <h2>My first project</h2>\n  <p>A small app I built to practice semantic HTML.</p>\n  <a href="https://example.com">View the project source</a>\n</article>',
    explanation:
      "Article groups self-contained content. The heading names it and the link explains its destination.",
    relatedLesson: {
      label: "A page with clear structure",
      href: "/learn/html/semantic-page",
    },
  },
  {
    slug: "cpp-max",
    title: "Find a maximum in C++",
    language: "cpp",
    difficulty: "Intermediate",
    topic: "C++",
    minutes: 15,
    objective: "Write a C++ function that returns the larger of two integers.",
    instructions: [
      "Copy the starter into a local .cpp file.",
      "Compile and test it with positive and negative inputs.",
    ],
    starter:
      "#include <iostream>\n\nint maximum(int a, int b) {\n  // Return the larger value.\n}\n\nint main() {\n  std::cout << maximum(-2, -7) << '\\n';\n}",
    tests: [],
    hints: ["Use an if statement or the conditional operator."],
    solution: "int maximum(int a, int b) {\n  return a > b ? a : b;\n}",
    explanation:
      "Comparing two values takes constant time and space. C++ code is compiled locally for this exercise.",
    relatedLesson: { label: "C++ conditions", href: "/tracks/cpp/conditions" },
    mode: "local",
  },
  {
    slug: "sql-filter",
    title: "Filter tasks with SQL",
    language: "sql",
    difficulty: "Intermediate",
    topic: "SQL",
    minutes: 12,
    objective: "Write a query that returns open tasks ordered by newest first.",
    instructions: [
      "Assume a tasks table with id, title, status, and created_at.",
      "Use WHERE and ORDER BY.",
      "Run the query in your own practice database.",
    ],
    starter: "SELECT id, title\nFROM tasks\n-- Add a filter and sort order",
    tests: [],
    hints: [
      "WHERE status = 'open' selects open tasks.",
      "ORDER BY created_at DESC puts newest first.",
    ],
    solution:
      "SELECT id, title\nFROM tasks\nWHERE status = 'open'\nORDER BY created_at DESC;",
    explanation:
      "The filter removes closed rows, and descending date order puts recently created tasks first. SQL execution needs a database; this page does not pretend to run one.",
    relatedLesson: {
      label: "Modeling data",
      href: "/learn/databases/modeling-data",
    },
    mode: "local",
  },
  {
    slug: "api-fallback",
    title: "Read an API response safely",
    language: "typescript",
    difficulty: "Intermediate",
    topic: "APIs",
    minutes: 15,
    objective:
      "Return a display name from unknown API data, with a safe fallback.",
    instructions: [
      "Accept unknown, because network data has not been validated.",
      "Return the user's name only when it is a string.",
      "Return 'Unknown' for malformed data.",
    ],
    starter:
      'function displayName(data: unknown): string {\n  // Validate data before reading a property.\n  return "Unknown";\n}',
    tests: [
      {
        label: "Valid name",
        invocation: 'console.log(displayName({ user: { name: "Ada" } }));',
        expected: "Ada",
      },
      {
        label: "Missing user",
        invocation: "console.log(displayName({}));",
        expected: "Unknown",
      },
      {
        label: "Wrong name type",
        invocation: "console.log(displayName({ user: { name: 42 } }));",
        expected: "Unknown",
      },
    ],
    hints: [
      "typeof data === 'object' and data !== null narrow the outer value.",
      "Check the nested user and name separately.",
    ],
    solution:
      'function displayName(data: unknown): string {\n  if (typeof data !== "object" || data === null || !("user" in data)) return "Unknown";\n  const user = data.user;\n  if (typeof user !== "object" || user === null || !("name" in user)) return "Unknown";\n  return typeof user.name === "string" ? user.name : "Unknown";\n}',
    explanation:
      "TypeScript types disappear at runtime. Treating external data as unknown forces each needed field to be checked before use.",
    relatedLesson: {
      label: "Types at boundaries",
      href: "/learn/typescript/types-at-boundaries",
    },
  },
  {
    slug: "group-tasks",
    title: "Group tasks by owner",
    language: "javascript",
    difficulty: "Advanced",
    topic: "Data structures",
    minutes: 20,
    objective: "Count tasks per owner in one pass through an array.",
    instructions: [
      "Return an object whose keys are owner names and values are counts.",
      "Do not mutate the input tasks.",
      "An empty input should return an empty object.",
    ],
    starter: "function countByOwner(tasks) {\n  // Build and return counts.\n}",
    tests: [
      {
        label: "Two owners",
        invocation:
          'console.log(JSON.stringify(countByOwner([{owner:"Ada"},{owner:"Lin"},{owner:"Ada"}])));',
        expected: '{"Ada":2,"Lin":1}',
      },
      {
        label: "Empty list",
        invocation: "console.log(JSON.stringify(countByOwner([])));",
        expected: "{}",
      },
      {
        label: "One owner",
        invocation:
          'console.log(JSON.stringify(countByOwner([{owner:"Sam"}])));',
        expected: '{"Sam":1}',
      },
    ],
    hints: [
      "Start with an empty object and visit each task once.",
      "Use counts[task.owner] ?? 0 for the current count.",
    ],
    solution:
      "function countByOwner(tasks) {\n  const counts = {};\n  for (const task of tasks) counts[task.owner] = (counts[task.owner] ?? 0) + 1;\n  return counts;\n}",
    explanation:
      "One loop gives O(n) time. The result uses O(k) space for k distinct owners. In a real app, validate owner names before using them as object keys.",
    relatedLesson: {
      label: "JavaScript arrays and objects",
      href: "/tracks/javascript/arrays",
    },
  },
];

export const quests: Quest[] = [
  {
    slug: "hello-world",
    number: "01",
    title: "Print Hello World",
    category: "FOUNDATIONS",
    language: "python",
    difficulty: "Beginner",
    topic: "Output",
    minutes: 5,
    objective: "Write a program that prints exactly “Hello, World!”",
    prerequisites: ["No prior experience"],
    concepts: ["Python", "Output", "Syntax"],
    instructions: [
      "Use print() to display text.",
      "Run the check. Capitalization and punctuation matter.",
    ],
    starter: "# Print your first message\n",
    tests: [
      {
        label: "Print the greeting",
        invocation: "",
        expected: "Hello, World!",
      },
    ],
    hints: ["Text goes between quotes.", 'Try print("Hello, World!").'],
    solution: 'print("Hello, World!")',
    explanation:
      "print sends a string to standard output. This is your first observable program.",
    relatedLesson: {
      label: "Python Hello World",
      href: "/tracks/python/hello-world",
    },
    nextQuest: "calculator",
  },
  {
    slug: "calculator",
    number: "02",
    title: "Build a Calculator",
    category: "JAVASCRIPT",
    language: "javascript",
    difficulty: "Beginner",
    topic: "Functions",
    minutes: 12,
    objective: "Write a function that adds two numbers and returns the result.",
    prerequisites: ["Variables", "Functions"],
    concepts: ["Parameters", "Return values"],
    instructions: [
      "Implement add(a, b).",
      "Run the checks, including a negative number.",
    ],
    starter: "function add(a, b) {\n  // Return the sum.\n}",
    tests: [
      { label: "2 + 3", invocation: "console.log(add(2, 3));", expected: "5" },
      {
        label: "-4 + 1",
        invocation: "console.log(add(-4, 1));",
        expected: "-3",
      },
    ],
    hints: [
      "The + operator adds numbers.",
      "Use return so callers receive the answer.",
    ],
    solution: "function add(a, b) {\n  return a + b;\n}",
    explanation:
      "Parameters carry inputs into a function, and return sends the result back.",
    relatedLesson: {
      label: "JavaScript functions",
      href: "/tracks/javascript/functions",
    },
    nextQuest: "reverse-string",
  },
  {
    slug: "reverse-string",
    number: "03",
    title: "Reverse a String",
    category: "JAVASCRIPT",
    language: "javascript",
    difficulty: "Beginner",
    topic: "Strings",
    minutes: 10,
    objective: "Reverse text and preserve every character.",
    prerequisites: ["Functions", "Strings"],
    concepts: ["String methods", "Edge cases"],
    instructions: [
      "Return the reversed string.",
      "The empty string is a valid input.",
    ],
    starter: "function reverse(value) {\n  // Reverse the characters.\n}",
    tests: [
      {
        label: "hello",
        invocation: 'console.log(reverse("hello"));',
        expected: "olleh",
      },
      { label: "empty", invocation: 'console.log(reverse(""));', expected: "" },
    ],
    hints: [
      "Turn the string into a character array.",
      "Reverse the array and join it.",
    ],
    solution:
      'function reverse(value) {\n  return value.split("").reverse().join("");\n}',
    explanation:
      "The method chain creates a new string; the original input stays unchanged.",
    relatedLesson: {
      label: "Reverse a string exercise",
      href: "/exercises/reverse-string",
    },
    nextQuest: "todo-list",
  },
  {
    slug: "todo-list",
    number: "04",
    title: "Model a Todo List",
    category: "WEB",
    language: "javascript",
    difficulty: "Intermediate",
    topic: "Arrays",
    minutes: 15,
    objective: "Return a new task list with one task appended.",
    prerequisites: ["Arrays", "Objects"],
    concepts: ["Immutable updates", "State"],
    instructions: [
      "Implement addTask(tasks, title).",
      "Each task needs a title and completed: false.",
      "Do not mutate the original array.",
    ],
    starter: "function addTask(tasks, title) {\n  // Return a new array.\n}",
    tests: [
      {
        label: "Add the first task",
        invocation: 'console.log(JSON.stringify(addTask([], "Study")));',
        expected: '[{"title":"Study","completed":false}]',
      },
      {
        label: "Keep existing tasks",
        invocation:
          'console.log(addTask([{title:"Read",completed:true}], "Build").length);',
        expected: "2",
      },
    ],
    hints: [
      "The spread operator can copy an array.",
      "Append { title, completed: false } to the new array.",
    ],
    solution:
      "function addTask(tasks, title) {\n  return [...tasks, { title, completed: false }];\n}",
    explanation:
      "Returning a new array makes state changes easier to reason about in a UI.",
    relatedLesson: {
      label: "State and events",
      href: "/learn/javascript/state-and-events",
    },
    nextQuest: "api-data",
  },
  {
    slug: "api-data",
    number: "05",
    title: "Read API Data",
    category: "WEB",
    language: "javascript",
    difficulty: "Intermediate",
    topic: "APIs",
    minutes: 15,
    objective: "Extract the display name from a response object.",
    prerequisites: ["Objects", "Functions"],
    concepts: ["JSON shapes", "Fallbacks"],
    instructions: [
      "Implement getDisplayName(response).",
      "Return 'Unknown' when user or name is missing.",
      "This models the data step before making a network request.",
    ],
    starter:
      "function getDisplayName(response) {\n  // Read response.user.name safely.\n}",
    tests: [
      {
        label: "Name exists",
        invocation: 'console.log(getDisplayName({ user: { name: "Ada" } }));',
        expected: "Ada",
      },
      {
        label: "User missing",
        invocation: "console.log(getDisplayName({}));",
        expected: "Unknown",
      },
    ],
    hints: [
      "Optional chaining avoids errors when a property is absent.",
      "Use ?? for a fallback.",
    ],
    solution:
      'function getDisplayName(response) {\n  return response.user?.name ?? "Unknown";\n}',
    explanation:
      "API data can be incomplete. Check the shape at runtime before using it in a UI.",
    relatedLesson: {
      label: "Types at boundaries",
      href: "/learn/typescript/types-at-boundaries",
    },
    nextQuest: "rest-api",
  },
  {
    slug: "rest-api",
    number: "06",
    title: "Build a REST API",
    category: "BACKEND",
    language: "javascript",
    difficulty: "Intermediate",
    topic: "HTTP",
    minutes: 90,
    objective: "Build and test a small task API in your own project.",
    prerequisites: ["HTTP basics", "Functions", "Data modeling"],
    concepts: ["Routes", "Validation", "Status codes"],
    instructions: [
      "Implement GET /tasks and POST /tasks in a local project.",
      "Reject blank titles with a 400 response.",
      "Test a successful request and a validation failure.",
      "Explain where the data is stored.",
    ],
    starter:
      "// Plan the API contract before coding:\n// GET /tasks -> 200 and a list\n// POST /tasks -> 201 or 400",
    tests: [],
    hints: [
      "Start with an in-memory list, then add persistence.",
      "Separate input validation from the route response.",
    ],
    solution:
      "GET /tasks returns tasks. POST /tasks validates title, creates a task, and returns 201; malformed titles return 400 with a useful error.",
    explanation:
      "This is a project quest. Completion is self-assessed after you build and test the API locally; this site never runs server code for you.",
    relatedLesson: {
      label: "Request to service",
      href: "/learn/backend/request-to-service",
    },
    mode: "project",
    projectHref: "/projects/task-manager",
    nextQuest: "authentication",
  },
  {
    slug: "authentication",
    number: "07",
    title: "Add Authentication",
    category: "BACKEND",
    language: "typescript",
    difficulty: "Advanced",
    topic: "Security",
    minutes: 120,
    objective: "Protect a user-owned resource in a local full-stack project.",
    prerequisites: ["HTTP", "Server routes", "Database basics"],
    concepts: ["Sessions", "Authorization", "Ownership"],
    instructions: [
      "Add sign-in with a maintained authentication solution.",
      "Require a session for private notes.",
      "Reject a request for another user's note even if the URL is changed.",
      "Test signed-out and cross-user requests.",
    ],
    starter:
      "// Define the authorization rule:\n// A note can be read only when note.ownerId === session.user.id",
    tests: [],
    hints: [
      "Authentication answers who; authorization answers what they may access.",
      "Check ownership on the server for every protected operation.",
    ],
    solution:
      "Authenticate the session, query the requested note, compare its owner ID to the session user ID, then respond with data or a 403/404.",
    explanation:
      "Authentication and authorization must be enforced on the server. This project quest is self-assessed after real tests.",
    relatedLesson: {
      label: "Authentication project",
      href: "/projects/auth-app",
    },
    mode: "project",
    projectHref: "/projects/auth-app",
    nextQuest: "deploy",
  },
  {
    slug: "deploy",
    number: "08",
    title: "Deploy an Application",
    category: "DEVOPS",
    language: "typescript",
    difficulty: "Intermediate",
    topic: "Deployment",
    minutes: 60,
    objective:
      "Release a project and verify its main user flow on the live URL.",
    prerequisites: ["A working project", "Git basics"],
    concepts: ["Build", "Preview", "Logs", "Rollback"],
    instructions: [
      "Run the build and tests locally.",
      "Push a reviewed change and deploy it.",
      "Open the live URL and complete the main user action.",
      "Write down how to inspect logs and roll back.",
    ],
    starter: "# Before release\n# 1. Test  2. Build  3. Deploy  4. Verify",
    tests: [],
    hints: [
      "A successful deployment command does not prove the user flow works.",
      "Check the actual production URL, including one failure path.",
    ],
    solution:
      "A release note should include commit, live URL, verification steps, log location, and rollback method.",
    explanation:
      "Shipping means checking the result users receive. This project quest is self-assessed after a live verification.",
    relatedLesson: {
      label: "From PR to production",
      href: "/learn/devops/from-pr-to-production",
    },
    mode: "project",
    projectHref: "/projects/saas",
  },
  {
    slug: "first-contribution",
    number: "09",
    title: "Make Your First Open-Source Contribution",
    category: "OPEN SOURCE",
    language: "javascript",
    difficulty: "Beginner",
    topic: "Git",
    minutes: 90,
    objective:
      "Improve a public project through a small, reviewed pull request.",
    prerequisites: [
      "Git basics",
      "GitHub basics",
      "Branches",
      "Commits",
      "Pull requests",
      "Code review",
    ],
    concepts: ["Issue scope", "Branching", "Review", "Contribution"],
    instructions: [
      "Find a small documentation, accessibility, or lesson issue.",
      "Create a branch and make one focused change.",
      "Run relevant checks and open a pull request with evidence.",
      "Respond to review, then verify the merged result when accepted.",
    ],
    starter:
      "git status\ngit switch -c docs/first-contribution\n# Edit a small file, test, then commit and open a PR.",
    tests: [],
    hints: [
      "A clear typo or broken link is a valid first contribution.",
      "Keep the PR small enough for a reviewer to verify quickly.",
    ],
    solution:
      "A good PR links the issue, explains the change, lists checks run, and responds to review comments with a focused revision.",
    explanation:
      "Open source is a collaboration workflow. A contribution is complete after the change is reviewed and accepted; this quest records your own progress locally.",
    relatedLesson: {
      label: "Your first pull request",
      href: "/open-source/first-pull-request",
    },
    mode: "project",
    projectHref: "/open-source/project",
  },
];

export function getExercise(slug: string) {
  return exercises.find((item) => item.slug === slug);
}
export function getQuest(slug: string) {
  return quests.find((item) => item.slug === slug);
}

export function validateChallenges(items: Challenge[]): string[] {
  const issues: string[] = [];
  const slugs = new Set<string>();
  for (const item of items) {
    if (
      !item.slug ||
      !item.title ||
      !item.objective ||
      !item.starter ||
      !item.relatedLesson.href
    )
      issues.push(`Missing required content: ${item.slug}`);
    if (slugs.has(item.slug)) issues.push(`Duplicate slug: ${item.slug}`);
    if (!item.mode && item.language !== "html" && item.tests.length === 0)
      issues.push(`Runnable challenge has no tests: ${item.slug}`);
    if (item.mode && item.tests.length)
      issues.push(`Non-runnable challenge has tests: ${item.slug}`);
    slugs.add(item.slug);
  }
  return issues;
}
