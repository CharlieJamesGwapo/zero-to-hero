"use client";

import { useState } from "react";
import Link from "next/link";
import { languages, type Language } from "@/lib/playground";
import { CodeWorkbench } from "./code-workbench";

export function PlaygroundExperience({
  compact = false,
  initialLanguage = "javascript",
  initialCode,
}: {
  compact?: boolean;
  initialLanguage?: Language;
  initialCode?: string;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [selectedCode, setSelectedCode] = useState(initialCode);
  const choices: Language[] = compact
    ? ["python", "javascript", "cpp"]
    : ["javascript", "python", "typescript", "html", "cpp"];
  return (
    <div className="playground-experience">
      <div
        className="language-tabs"
        role="group"
        aria-label="Choose a programming language"
      >
        {choices.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={language === id}
            onClick={() => {
              setLanguage(id);
              setSelectedCode(undefined);
            }}
          >
            {languages[id].name}
          </button>
        ))}
      </div>
      <CodeWorkbench
        key={`${language}:${selectedCode ?? "default"}`}
        language={language}
        starter={selectedCode ?? languages[language].starter}
        compact={compact}
      />
      {compact && (
        <Link className="text-link" href="/playground">
          Open the full playground <span aria-hidden="true">↗</span>
        </Link>
      )}
      {!compact && (
        <p className="runtime-note">
          JavaScript and TypeScript run in disposable browser workers. Python
          loads Pyodide only when you run it. HTML/CSS renders in a script-free
          sandbox. No code is sent to this site’s server.
        </p>
      )}
    </div>
  );
}
