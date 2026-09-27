export type PromptMode = "Explain" | "Debug" | "Build" | "Review";
const instructions: Record<PromptMode, string> = {
  Explain:
    "Teach the concept step by step. Use a small example, then ask me one check-for-understanding question. Do not skip the reasoning.",
  Debug:
    "Help me find the cause. First suggest the smallest reproduction and what evidence to inspect. Give a fix only after explaining why the bug happens, and include a way to verify it.",
  Build:
    "Break this into small implementation steps. Show the first step and its acceptance check. Explain tradeoffs and let me implement before moving on.",
  Review:
    "Review for correctness, accessibility, security, and maintainability. Prioritize concrete issues, cite the relevant code or behavior, and suggest a verification step for each issue.",
};
export function buildAiPrompt(mode: PromptMode, goal: string, context: string) {
  const objective = goal.trim();
  if (!objective) return "";
  return `You are my patient software development tutor.\n\nGoal: ${objective}\n${context.trim() ? `Context / constraints: ${context.trim()}\n` : ""}\nTask: ${instructions[mode]}\n\nIf you need missing information, ask a specific question before assuming. Do not invent test results, links, or API behavior. If you provide code, explain how I can run and check it myself.`;
}
