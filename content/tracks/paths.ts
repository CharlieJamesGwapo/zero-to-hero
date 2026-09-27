import type { Language } from "../../src/lib/playground";

export type Stage = {
  slug: string;
  title: string;
  summary: string;
  example: string;
  practice: string;
};
export type Track = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  language: Language;
  stages: Stage[];
  project: string;
  projectHref: string;
};

function stage(
  title: string,
  summary: string,
  example: string,
  practice: string,
): Stage {
  return {
    slug: title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    title,
    summary,
    example,
    practice,
  };
}

export const tracks: Track[] = [
  {
    slug: "fundamentals",
    title: "Programming Fundamentals",
    audience: "Absolute beginners",
    language: "javascript",
    description:
      "Understand what a program does before choosing a framework. The ideas transfer between languages.",
    project: "A small calculator",
    projectHref: "/quests/calculator",
    stages: [
      stage(
        "What is a program?",
        "A program is a set of instructions a computer executes. Inputs become outputs through rules you write.",
        'console.log("A program is running");',
        "Change the message, run it, and describe what changed.",
      ),
      stage(
        "What is code?",
        "Code expresses those instructions in a language with precise syntax. The computer cannot guess what you meant.",
        'console.log("Code is instructions");',
        "Remove a quote, run the code, and read the syntax error.",
      ),
      stage(
        "Files and folders",
        "Source files store code; folders organize related files. Extensions often tell tools how to read a file.",
        'console.log("main.js is a file name");',
        "Create a main.js file locally and explain where it lives.",
      ),
      stage(
        "Variables",
        "A variable gives a value a name so later code can reuse it.",
        'const name = "Ada";\nconsole.log(name);',
        "Store your favorite language in a variable and print it.",
      ),
      stage(
        "Data types",
        "Numbers, strings, booleans, and objects behave differently. Choose a type that matches the meaning.",
        'console.log(typeof 42, typeof "42", typeof true);',
        "Compare the types of a number and the same digits inside quotes.",
      ),
      stage(
        "Conditions",
        "A condition chooses a branch based on a true or false expression.",
        'const age = 18;\nif (age >= 18) console.log("adult");',
        "Change the input and predict the output before running.",
      ),
      stage(
        "Loops",
        "A loop repeats work while a condition holds or over a collection.",
        "for (let n = 1; n <= 3; n++) console.log(n);",
        "Print 1 through 5 without writing five print statements.",
      ),
      stage(
        "Functions",
        "A function names a reusable operation, accepts inputs, and can return a result.",
        "function double(n) { return n * 2; }\nconsole.log(double(4));",
        "Write a function that triples a number.",
      ),
      stage(
        "Arrays",
        "An array keeps an ordered group of values.",
        "const scores = [8, 10, 7];\nconsole.log(scores[0]);",
        "Add a value, then print the first and last items.",
      ),
      stage(
        "Objects and structures",
        "Objects group named values that belong together.",
        'const user = { name: "Ada", active: true };\nconsole.log(user.name);',
        "Create a task object with title and completed fields.",
      ),
      stage(
        "Input and output",
        "Programs receive input and produce output. A browser form, function parameter, or file can provide input.",
        'function greet(name) { return `Hello, ${name}`; }\nconsole.log(greet("Sam"));',
        "Call greet with two names and compare the outputs.",
      ),
      stage(
        "State and errors",
        "State is data that can change over time. Errors tell you where an assumption failed.",
        "let count = 0;\ncount += 1;\nconsole.log(count);",
        "Change state twice; then try using a name you did not define.",
      ),
      stage(
        "Algorithms and complexity",
        "An algorithm is a repeatable method. Complexity describes how its work grows as input grows.",
        "const values = [2, 5, 9];\nfor (const value of values) console.log(value);",
        "Count how many loop steps happen for three and ten values.",
      ),
      stage(
        "Debugging",
        "Reproduce a failure, inspect values, narrow the cause, and test the fix.",
        "const total = 2 + 3;\nconsole.log({ total });",
        "Introduce a wrong operator, inspect the output, and correct it.",
      ),
    ],
  },
  {
    slug: "python",
    title: "Python",
    audience: "First-time programmers and automation learners",
    language: "python",
    description:
      "A gentle path from your first print statement to functions, files, classes, and APIs.",
    project: "Calculator → guessing game → todo CLI → API script",
    projectHref: "/exercises/python-calculator",
    stages: [
      stage(
        "What is Python?",
        "Python is a general-purpose language with readable syntax. You can use it for scripts, web services, and data work.",
        'print("Python is running")',
        "Run the program and identify the output.",
      ),
      stage(
        "Hello World",
        "print writes text to standard output. A string literal is text inside quotes.",
        'print("Hello, World!")',
        "Change the greeting and run it again.",
      ),
      stage(
        "Variables",
        "Bind a name to a value, then reuse it instead of repeating the literal.",
        'name = "Ada"\nprint(name)',
        "Store your name and print a greeting.",
      ),
      stage(
        "Strings",
        "Strings hold text. You can combine and format them.",
        'name = "Ada"\nprint(f"Hello, {name}")',
        "Print a sentence with two variable values.",
      ),
      stage(
        "Numbers",
        "Integers and floats support arithmetic, but division may change the type of the result.",
        "price = 12.5\nprint(price * 2)",
        "Calculate a subtotal and a 10% discount.",
      ),
      stage(
        "Conditions",
        "if, elif, and else choose behavior from a condition. Indentation marks each branch.",
        'score = 75\nif score >= 60:\n    print("Pass")\nelse:\n    print("Try again")',
        "Add a third branch for an excellent score.",
      ),
      stage(
        "Loops",
        "for repeats over a sequence; while repeats while a condition remains true.",
        "for number in range(1, 4):\n    print(number)",
        "Print the numbers 1 through 5.",
      ),
      stage(
        "Functions",
        "A function groups reusable logic. Parameters are inputs; return provides an output.",
        "def square(value):\n    return value * value\n\nprint(square(4))",
        "Write a function that doubles an input.",
      ),
      stage(
        "Lists",
        "A list is an ordered, mutable collection. Indexes start at zero.",
        'tasks = ["read", "build"]\ntasks.append("ship")\nprint(tasks[0])',
        "Append a task and print the list length.",
      ),
      stage(
        "Dictionaries",
        "A dictionary stores key-value pairs for named data.",
        'task = {"title": "Study", "done": False}\nprint(task["title"])',
        "Add a priority key and read it.",
      ),
      stage(
        "Modules",
        "Import a module to reuse code rather than rewriting it.",
        "import math\nprint(math.sqrt(16))",
        "Use math.ceil on 2.2 and explain the result.",
      ),
      stage(
        "Exceptions",
        "Exceptions report failure. Catch a specific error only when you can handle it meaningfully.",
        'try:\n    value = int("12")\n    print(value)\nexcept ValueError:\n    print("Not a number")',
        "Change the input to invalid text and explain the fallback.",
      ),
      stage(
        "Files",
        "A file persists data beyond a single run. Use a context manager to close it reliably.",
        'from pathlib import Path\nPath("note.txt").write_text("Learn Python")\nprint(Path("note.txt").read_text())',
        "Run this in a local Python project and inspect the created file; the browser runtime uses temporary files.",
      ),
      stage(
        "Classes",
        "A class can group data and behavior for related objects. Begin with simple functions when they are enough.",
        "class Counter:\n    def __init__(self):\n        self.value = 0\n\ncounter = Counter()\nprint(counter.value)",
        "Add an increment method and call it twice.",
      ),
      stage(
        "APIs",
        "An API lets programs exchange data through requests and responses. Check status and data shape before trusting it.",
        'import json\nresponse = json.loads("{\\"city\\": \\"Manila\\"}")\nprint(response["city"])',
        "Parse a sample JSON response, then fetch a public API in a local project.",
      ),
    ],
  },
  {
    slug: "cpp",
    title: "C++",
    audience: "Beginners interested in systems and performance",
    language: "cpp",
    description:
      "Learn compiled-program basics step by step, then work toward data structures and local CLI tools.",
    project: "Calculator → guessing game → CLI task manager",
    projectHref: "/exercises/cpp-max",
    stages: [
      stage(
        "What is C++?",
        "C++ is a compiled language often used where control over memory and performance matters. Your compiler turns source into an executable.",
        '#include <iostream>\nint main() { std::cout << "Ready\\n"; }',
        "Save as main.cpp, compile it, and run the executable.",
      ),
      stage(
        "Hello World",
        "main is the program entry point. std::cout sends characters to standard output.",
        '#include <iostream>\nint main() {\n  std::cout << "Hello, World!\\n";\n}',
        "Change the greeting, compile again, and run.",
      ),
      stage(
        "Variables",
        "Declare a variable with a type and a name; initialize it before use.",
        "#include <iostream>\nint main() { int score = 10; std::cout << score; }",
        "Store and print your own score.",
      ),
      stage(
        "Types",
        "A type describes the data and operations allowed. int, double, bool, and char are common starting points.",
        "#include <iostream>\nint main() { double price = 12.5; std::cout << price * 2; }",
        "Compare integer division with floating-point division.",
      ),
      stage(
        "Input and Output",
        "std::cin reads input; std::cout writes output. Validate input in real programs.",
        "#include <iostream>\nint main() { int age; std::cin >> age; std::cout << age; }",
        "Read two numbers and print their sum.",
      ),
      stage(
        "Conditions",
        "if and else choose which block to run based on a boolean expression.",
        '#include <iostream>\nint main() { int n = 4; if (n > 0) std::cout << "positive"; else std::cout << "other"; }',
        "Handle positive, negative, and zero separately.",
      ),
      stage(
        "Loops",
        "for and while repeat operations. Make sure a loop reaches its stopping condition.",
        '#include <iostream>\nint main() { for (int i = 1; i <= 3; ++i) std::cout << i << "\\n"; }',
        "Print 1 through 10.",
      ),
      stage(
        "Functions",
        "A function declares a return type, name, and parameters.",
        "#include <iostream>\nint square(int n) { return n * n; }\nint main() { std::cout << square(4); }",
        "Write a function that returns the larger of two ints.",
      ),
      stage(
        "Arrays",
        "A fixed-size array holds values of one type. std::vector is usually easier for a changing number of items.",
        "#include <iostream>\nint main() { int scores[3] = {3, 5, 8}; std::cout << scores[1]; }",
        "Print each item without reading beyond the array.",
      ),
      stage(
        "Strings",
        "std::string manages text and supports length, comparison, and concatenation.",
        '#include <iostream>\n#include <string>\nint main() { std::string name = "Ada"; std::cout << name.size(); }',
        "Join a first and last name with a space.",
      ),
      stage(
        "References",
        "A reference is another name for an existing object. const references avoid copying without allowing mutation.",
        '#include <iostream>\n#include <string>\nvoid greet(const std::string& name) { std::cout << name; }\nint main() { greet("Ada"); }',
        "Explain why the function cannot change name.",
      ),
      stage(
        "Pointers",
        "A pointer stores an address. Dereference only valid pointers; prefer safe ownership types in real projects.",
        "#include <iostream>\nint main() { int n = 7; int* p = &n; std::cout << *p; }",
        "Change n and observe the dereferenced value.",
      ),
      stage(
        "Classes",
        "A class groups state and behavior with access rules.",
        "#include <iostream>\nclass Counter { public: int value = 0; void add() { ++value; } };\nint main() { Counter c; c.add(); std::cout << c.value; }",
        "Add a reset method.",
      ),
      stage(
        "STL",
        "The standard library supplies tested containers and algorithms such as vector and sort.",
        "#include <algorithm>\n#include <iostream>\n#include <vector>\nint main() { std::vector<int> v{3,1,2}; std::sort(v.begin(),v.end()); std::cout << v[0]; }",
        "Sort three numbers and print the largest.",
      ),
      stage(
        "File I/O",
        "fstream reads and writes files. Always check that opening succeeded.",
        '#include <fstream>\nint main() { std::ofstream file("note.txt"); if (file) file << "Hello"; }',
        "Write a line locally, then read it back.",
      ),
    ],
  },
  {
    slug: "javascript",
    title: "JavaScript",
    audience: "Interactive web builders",
    language: "javascript",
    description:
      "Move from data and functions to browser events, async requests, modules, and resilient interfaces.",
    project: "Task manager",
    projectHref: "/projects/task-manager",
    stages: [
      stage(
        "Variables",
        "Use const for a binding that will not be reassigned and let when it will change.",
        'const name = "Ada";\nconsole.log(name);',
        "Store a favorite programming language and print it.",
      ),
      stage(
        "Functions",
        "Functions name reusable behavior and make inputs and outputs explicit.",
        "function add(a, b) { return a + b; }\nconsole.log(add(2, 3));",
        "Write a multiply function.",
      ),
      stage(
        "Arrays",
        "Arrays hold ordered data; map and filter derive new arrays.",
        "const numbers = [1, 2, 3];\nconsole.log(numbers.map(n => n * 2));",
        "Filter out odd values.",
      ),
      stage(
        "Objects",
        "Objects hold related named properties. Check missing properties before use.",
        'const task = { title: "Build", done: false };\nconsole.log(task.title);',
        "Add a priority property.",
      ),
      stage(
        "DOM",
        "The document object model lets browser code read and update a page.",
        'console.log("Open a browser page to inspect document.querySelector");',
        "On a local HTML page, select a heading and change its text.",
      ),
      stage(
        "Events",
        "Events connect user actions to behavior; keep data and rendering in sync.",
        'console.log("In a page: button.addEventListener(\\"click\\", handler)");',
        "Make a local button update a counter.",
      ),
      stage(
        "Promises",
        "A Promise represents a value that may arrive or fail later.",
        "Promise.resolve(42).then(value => console.log(value));",
        "Handle a rejected Promise with catch.",
      ),
      stage(
        "Async Await",
        "async/await makes Promise flows easier to read while keeping failure handling explicit.",
        "async function answer() { return 42; }\nconsole.log(await answer());",
        "Wrap an asynchronous call in try/catch.",
      ),
      stage(
        "Fetch",
        "fetch makes an HTTP request and returns a Response; check response.ok before reading data.",
        'console.log("Use fetch in a real browser page or application");',
        "Fetch a public JSON endpoint in your local project and handle errors.",
      ),
      stage(
        "APIs",
        "Treat remote JSON as untrusted. Validate the fields you need.",
        'const data = { user: { name: "Ada" } };\nconsole.log(data.user?.name ?? "Unknown");',
        "Handle a response with a missing user.",
      ),
      stage(
        "Modules",
        "Modules split code into files with explicit imports and exports.",
        'console.log("export function add(a, b) { return a + b; }");',
        "Create math.js locally and import its add function.",
      ),
      stage(
        "Error Handling",
        "Errors should be observed, explained, and handled at a useful boundary.",
        'try { JSON.parse("broken"); } catch (error) { console.log(error.name); }',
        "Show a friendly message for invalid JSON.",
      ),
    ],
  },
  {
    slug: "typescript",
    title: "TypeScript",
    audience: "JavaScript developers building larger apps",
    language: "typescript",
    description:
      "Use types to explain contracts, then validate the runtime data those types cannot guarantee.",
    project: "Typed task manager",
    projectHref: "/projects/task-manager",
    stages: [
      stage(
        "Types",
        "Type annotations document values and catch mismatches during development.",
        "const count: number = 3;\nconsole.log(count);",
        "Annotate a string and a boolean.",
      ),
      stage(
        "Interfaces",
        "An interface names an object contract that multiple parts of an app can share.",
        'interface Task { title: string; done: boolean }\nconst task: Task = { title: "Build", done: false };\nconsole.log(task.title);',
        "Add an optional dueDate property.",
      ),
      stage(
        "Unions",
        "A union allows one of several valid shapes or values.",
        'type Status = "open" | "done";\nconst status: Status = "open";\nconsole.log(status);',
        "Define a loading, success, or error state.",
      ),
      stage(
        "Generics",
        "Generics keep relationships between input and output types.",
        "function first<T>(values: T[]): T | undefined { return values[0]; }\nconsole.log(first([1, 2]));",
        "Write a generic last function.",
      ),
      stage(
        "Narrowing",
        "A runtime check narrows a broad type before you use it.",
        'function label(value: string | number) { return typeof value === "number" ? value.toFixed(2) : value; }\nconsole.log(label(2));',
        "Narrow an unknown value to a string.",
      ),
      stage(
        "Functions",
        "Type parameters and return values so a function contract is clear.",
        "function double(value: number): number { return value * 2; }\nconsole.log(double(3));",
        "Type a function that joins two strings.",
      ),
      stage(
        "Utility Types",
        "Built-in types such as Partial and Pick derive related contracts without duplication.",
        "type Task = { title: string; done: boolean };\nconst update: Partial<Task> = { done: true };\nconsole.log(update);",
        "Use Pick to select only title.",
      ),
      stage(
        "API Typing",
        "A typed response describes your expectation; it does not verify incoming JSON.",
        'type User = { name: string };\nconst user: User = { name: "Ada" };\nconsole.log(user.name);',
        "Write a type for an API task object.",
      ),
      stage(
        "Runtime Validation",
        "Validate unknown data before trusting it as a typed value.",
        'function isUser(value: unknown): value is { name: string } { return typeof value === "object" && value !== null && "name" in value && typeof value.name === "string"; }\nconsole.log(isUser({name:"Ada"}));',
        "Reject an object whose name is a number.",
      ),
    ],
  },
  {
    slug: "computer-science",
    title: "Computer Science",
    audience: "Developers ready to understand deeper systems",
    language: "javascript",
    description:
      "A separate path through data structures, complexity, memory, processes, networks, and distributed systems.",
    project: "Explain and benchmark a small data structure",
    projectHref: "/projects/saas",
    stages: [
      stage(
        "Data Structures",
        "A data structure organizes information for specific access patterns.",
        'const values = new Map([["a", 1]]);\nconsole.log(values.get("a"));',
        "Choose between an array and a map for key lookups.",
      ),
      stage(
        "Algorithms",
        "An algorithm is a finite, testable method for solving a problem.",
        "const values = [3, 1, 2];\nconsole.log(values.sort((a,b) => a-b));",
        "Explain each step of a linear search.",
      ),
      stage(
        "Big O",
        "Big O describes how resource use grows with input size, not exact running time.",
        "for (const item of [1,2,3]) console.log(item);",
        "Count steps for inputs of 3, 10, and 100.",
      ),
      stage(
        "Memory",
        "Programs store values in memory; references can share an object rather than copy it.",
        "const a = { n: 1 }; const b = a; b.n = 2; console.log(a.n);",
        "Explain why a.n changed.",
      ),
      stage(
        "Processes",
        "A process is a running program with its own operating-system resources.",
        'console.log("A browser tab runs code in a process or process group.");',
        "Find the process for a local development server.",
      ),
      stage(
        "Threads",
        "Threads run work within a process and may share memory; coordination prevents races.",
        'console.log("A Web Worker keeps work off the main UI thread.");',
        "Explain why a worker helps with an expensive calculation.",
      ),
      stage(
        "Networking",
        "Networks move bytes through protocols; HTTP defines request and response semantics.",
        'console.log("GET /tasks → 200 OK");',
        "Trace a browser request from URL to response.",
      ),
      stage(
        "Operating Systems",
        "The OS schedules processes and mediates files, memory, and network access.",
        'console.log("An application asks the OS to read a file.");',
        "Identify three resources a local app uses.",
      ),
      stage(
        "Databases",
        "A database stores durable data with querying and consistency rules.",
        'console.log("SELECT title FROM tasks WHERE done = false;");',
        "Explain why a unique constraint matters.",
      ),
      stage(
        "Distributed Systems",
        "Multiple machines introduce latency, partial failure, and coordination choices.",
        'console.log("Retry a request carefully: it may have succeeded already.");',
        "Describe what happens if a payment request times out after the server receives it.",
      ),
    ],
  },
];

export function getTrack(slug: string) {
  return tracks.find((track) => track.slug === slug);
}
export function getStage(trackSlug: string, stageSlug: string) {
  return getTrack(trackSlug)?.stages.find((item) => item.slug === stageSlug);
}
