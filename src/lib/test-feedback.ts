export type TestOutcome = {
  label: string;
  expected: string;
  actual: string;
  error: boolean;
};

function brief(value: string) {
  return JSON.stringify(value.length > 120 ? `${value.slice(0, 120)}…` : value);
}

export function firstFailureFeedback(results: TestOutcome[]): string | null {
  const failed = results.find(
    (item) => item.error || item.actual !== item.expected,
  );
  if (!failed) return null;
  if (failed.error)
    return `Start with the check ${failed.label}. Your code raised an error. Check the function or variable name used by this check, then read its error message in the result.`;
  if (!failed.actual)
    return `Start with the check ${failed.label}. It expected ${brief(failed.expected)} but got no output. Check whether your code returns or prints the value the check uses.`;
  return `Start with the check ${failed.label}. It expected ${brief(failed.expected)} but got ${brief(failed.actual)}. Trace this input through your code and compare the returned value.`;
}
