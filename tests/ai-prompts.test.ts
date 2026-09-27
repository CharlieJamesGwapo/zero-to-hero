import assert from "node:assert/strict";
import test from "node:test";
import { buildAiPrompt } from "../src/lib/ai-prompts";

test("prompt builder keeps learner goal and asks for verifiable steps", () => {
  const prompt = buildAiPrompt(
    "Debug",
    "My form does not submit",
    "Plain HTML and JavaScript",
  );
  assert.match(prompt, /My form does not submit/);
  assert.match(prompt, /smallest reproduction/);
  assert.match(prompt, /Plain HTML and JavaScript/);
  assert.match(prompt, /run and check it myself/);
  assert.equal(buildAiPrompt("Build", "  ", "anything"), "");
});
