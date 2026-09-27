import assert from "node:assert/strict";
import test from "node:test";
import { firstFailureFeedback } from "../src/lib/test-feedback";

test("feedback identifies the first mismatch and a useful next check", () => {
  const feedback = firstFailureFeedback([
    {
      label: "ordinary input",
      expected: "olleh",
      actual: "hello",
      error: false,
    },
    { label: "empty input", expected: "", actual: "undefined", error: false },
  ]);
  assert.match(feedback ?? "", /ordinary input/);
  assert.match(feedback ?? "", /olleh/);
  assert.match(feedback ?? "", /hello/);
  assert.match(feedback ?? "", /trace/i);
});

test("feedback distinguishes an exception from missing output", () => {
  assert.match(
    firstFailureFeedback([
      {
        label: "named value",
        expected: "true",
        actual: "ReferenceError",
        error: true,
      },
    ]) ?? "",
    /error.*name|name.*error/i,
  );
  assert.match(
    firstFailureFeedback([
      { label: "returns a value", expected: "42", actual: "", error: false },
    ]) ?? "",
    /no output/i,
  );
  assert.equal(
    firstFailureFeedback([
      { label: "passes", expected: "42", actual: "42", error: false },
    ]),
    null,
  );
});

test("feedback keeps very long output readable", () => {
  const feedback = firstFailureFeedback([
    {
      label: "short result",
      expected: "ok",
      actual: "x".repeat(500),
      error: false,
    },
  ]);
  assert.ok(feedback);
  assert.ok(feedback.length < 300);
});
