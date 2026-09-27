import type { Metadata } from "next";
import Link from "next/link";
import { AiPromptBuilder } from "@/components/ai-prompt-builder";
export const metadata: Metadata = {
  title: "AI learning workflows",
  description:
    "Practical tutorials for learning and building with Codex, Claude Code, OpenRouter, and GLM.",
};
const tools = [
  {
    name: "OpenAI Codex",
    type: "Coding agent",
    url: "https://learn.chatgpt.com/docs/codex/cli",
    steps: [
      "Read the CLI setup guide and install it from the official instructions.",
      "Open a small project folder and explain the goal in one or two sentences.",
      "Ask Codex to inspect relevant files, suggest a plan, and show the changes it makes.",
      "Run the project and tests yourself; ask it to explain anything you cannot yet explain.",
    ],
    example:
      "Inspect this HTML form. Point out label and keyboard issues, then propose the smallest fix. Show me how to verify it in a browser.",
  },
  {
    name: "Claude Code",
    type: "Coding agent",
    url: "https://code.claude.com/docs/en/overview",
    steps: [
      "Follow the official setup guide for your system.",
      "Start in a small repository and describe the current task and constraints.",
      "Ask for a plan, let it inspect files, and review each change before accepting it.",
      "Run checks and inspect the rendered result; request a correction when evidence does not match the goal.",
    ],
    example:
      "Read my page and explain its HTML structure. Help me add a semantic project section in small steps. Do not claim a test passed unless you ran it.",
  },
  {
    name: "OpenRouter",
    type: "Model API gateway",
    url: "https://openrouter.ai/docs/quickstart",
    steps: [
      "Read the official quickstart and choose a model that fits your task and budget.",
      "Create an API key in your own account and keep it in a server-side environment variable.",
      "Make a small server-side request, inspect the response and error handling, then add a UI only if needed.",
      "Set usage limits and review current pricing in the provider dashboard before shipping.",
    ],
    example:
      "Design a server endpoint that accepts a question and sends it to an AI model. Show how to keep the API key off the client and handle failed requests.",
  },
  {
    name: "GLM via Z.AI",
    type: "Model API",
    url: "https://docs.z.ai/guides/overview/quick-start",
    steps: [
      "Use the official quickstart to confirm access, current model names, and request format.",
      "Store your key only on the server or in local environment variables that are never committed.",
      "Try one small request, log status and errors safely, and check the actual output.",
      "Compare cost, latency, and answer quality on your own examples before integrating it.",
    ],
    example:
      "Help me build a minimal server-side GLM request using the current official docs. Ask me for the runtime first; never put an API key in browser code.",
  },
];
export default function AiPage() {
  return (
    <div className="shell page-wrap ai-page">
      <div className="page-intro">
        <span className="eyebrow">AI / LEARN · BUILD · VERIFY</span>
        <h1>
          Use AI as a <em>thinking partner.</em>
        </h1>
        <p>
          Learn the fundamentals yourself, then use AI to ask better questions,
          inspect code, and review work. These guides show a practical starting
          workflow for coding agents and model APIs.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="#prompt-builder-title">
            Build a prompt ↗
          </Link>
          <Link className="button button-secondary" href="/learn/html">
            Practice with HTML →
          </Link>
        </div>
      </div>
      <section className="ai-principles">
        <span className="eyebrow">THE REPEATABLE WORKFLOW</span>
        <h2>One task, one testable outcome.</h2>
        <ol>
          <li>
            <strong>Define the task.</strong> Say what the user should be able
            to do and what constraints matter.
          </li>
          <li>
            <strong>Ask for a small plan.</strong> Have the AI name files,
            risks, and a verification step before changing code.
          </li>
          <li>
            <strong>Build and inspect.</strong> Read changes, run the app, and
            try the flow yourself.
          </li>
          <li>
            <strong>Verify and explain.</strong> Run tests where useful, check
            the screen and keyboard, and explain the result without the AI.
          </li>
        </ol>
        <p>
          Never paste passwords, private keys, or personal data into a prompt.
          AI output can be wrong or outdated; use official documentation and
          real test results to confirm it.
        </p>
      </section>
      <AiPromptBuilder />
      <section className="ai-guides" aria-labelledby="ai-tools-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TOOL GUIDES</span>
            <h2 id="ai-tools-title">Choose the tool for the job.</h2>
          </div>
          <p>
            Coding agents work with your project. Model APIs power features you
            build. Check each official guide for the latest setup steps.
          </p>
        </div>
        <div className="ai-tool-grid">
          {tools.map((tool) => (
            <article className="ai-tool-card" key={tool.name}>
              <span className="eyebrow">{tool.type}</span>
              <h3>{tool.name}</h3>
              <ol>
                {tool.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="ai-example">
                <strong>Try asking</strong>
                <p>{tool.example}</p>
              </div>
              <a
                className="text-link"
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open official guide ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="ai-principles">
        <span className="eyebrow">FIRST PROJECT</span>
        <h2>Apply the workflow to your portfolio.</h2>
        <p>
          Complete the guided HTML module. Then ask an AI tool to review the
          page against the lesson checklist. Compare its feedback to what you
          see in the browser, fix one issue, and keep a note of why you changed
          it.
        </p>
        <Link className="text-link" href="/learn/html/workshop">
          Open the HTML workshop ↗
        </Link>
      </section>
    </div>
  );
}
