"use client";
import { useState } from "react";
import { buildAiPrompt, type PromptMode } from "@/lib/ai-prompts";
const modes: PromptMode[] = ["Explain", "Debug", "Build", "Review"];
export function AiPromptBuilder() {
  const [mode, setMode] = useState<PromptMode>("Explain");
  const [goal, setGoal] = useState("");
  const [context, setContext] = useState("");
  const [status, setStatus] = useState("");
  const prompt = buildAiPrompt(mode, goal, context);
  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setStatus("Prompt copied. Paste it into your chosen AI tool.");
    } catch {
      setStatus("Clipboard unavailable. Select and copy the prompt below.");
    }
  }
  return (
    <section className="prompt-builder" aria-labelledby="prompt-builder-title">
      <div>
        <span className="eyebrow">INTERACTIVE TOOL</span>
        <h2 id="prompt-builder-title">Build a better learning prompt.</h2>
        <p>
          Describe what you want to understand or make. The generated prompt
          asks the AI to teach, show evidence, and leave verification to you.
          Nothing here is sent to a server.
        </p>
      </div>
      <div className="prompt-form">
        <fieldset>
          <legend>What help do you need?</legend>
          <div className="prompt-modes">
            {modes.map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  name="prompt-mode"
                  value={item}
                  checked={mode === item}
                  onChange={() => setMode(item)}
                />{" "}
                {item}
              </label>
            ))}
          </div>
        </fieldset>
        <label>
          Goal or problem
          <textarea
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            placeholder="For example: Help me understand why my contact form labels do not focus the fields."
            rows={3}
          />
        </label>
        <label>
          Context or constraints <span>(optional)</span>
          <textarea
            value={context}
            onChange={(event) => setContext(event.target.value)}
            placeholder="For example: Beginner, using plain HTML, no frameworks."
            rows={2}
          />
        </label>
      </div>
      <div className="prompt-result">
        <div className="workshop-panel-head">
          <strong>Your prompt</strong>
          <button
            className="button button-secondary"
            type="button"
            disabled={!prompt}
            onClick={() => void copy()}
          >
            Copy prompt
          </button>
        </div>
        <textarea
          aria-label="Generated AI prompt"
          readOnly
          value={prompt}
          placeholder="Enter your goal to generate a prompt."
          rows={11}
        />
        <p role="status">{status}</p>
      </div>
    </section>
  );
}
