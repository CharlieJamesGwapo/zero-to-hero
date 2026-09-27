import type { Language } from "./playground";

export type RunResult = {
  ok: boolean;
  output: string[];
  error?: string;
  value?: string;
  timedOut?: boolean;
};

function runWorker(
  worker: Worker,
  code: string,
  timeoutMs: number,
): Promise<RunResult> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (result: RunResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      resolve(result);
    };
    const timer = setTimeout(
      () =>
        finish({
          ok: false,
          output: [],
          error: "Execution timed out. Check for an endless loop or try again.",
          timedOut: true,
        }),
      timeoutMs,
    );
    worker.onmessage = ({ data }: MessageEvent<RunResult>) => finish(data);
    worker.onerror = (event) =>
      finish({
        ok: false,
        output: [],
        error: event.message || "The browser could not start the runtime.",
      });
    worker.postMessage({ code });
  });
}

const jsWorker = `self.onmessage = async ({ data }) => {
  const output = [];
  const display = (...values) => { if (output.length >= 200) return; output.push(values.map((value) => {
    if (typeof value === "string") return value;
    try { const json = JSON.stringify(value); return json === undefined ? String(value) : json; } catch { return String(value); }
  }).join(" ").slice(0, 2000)); };
  const console = { log: display, info: display, warn: display, error: display };
  try {
    const run = new Function("console", "return (async () => {\\n" + data.code + "\\n})()");
    const value = await run(console);
    self.postMessage({ ok: true, output, value: value == null ? "" : String(value) });
  } catch (error) {
    self.postMessage({ ok: false, output, error: String(error) });
  }
};`;

export async function runCode(
  language: Language,
  code: string,
): Promise<RunResult> {
  if (language === "cpp")
    return {
      ok: false,
      output: [],
      error:
        "C++ runs with a local compiler. Copy this code into a .cpp file, then run: c++ main.cpp -o main && ./main",
    };
  if (language === "html")
    return { ok: true, output: ["Preview updated in the isolated frame."] };
  if (code.length > 20000)
    return {
      ok: false,
      output: [],
      error: "Keep examples under 20,000 characters.",
    };
  if (language === "python") {
    return runWorker(
      new Worker("/workers/python.mjs", { type: "module" }),
      code,
      45000,
    );
  }
  let executable = code;
  if (language === "typescript") {
    const ts = await import("typescript");
    const compiled = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.None,
      },
      reportDiagnostics: true,
    });
    const errors =
      compiled.diagnostics?.filter(
        (item) => item.category === ts.DiagnosticCategory.Error,
      ) ?? [];
    if (errors.length)
      return {
        ok: false,
        output: [],
        error: ts.flattenDiagnosticMessageText(errors[0].messageText, "\n"),
      };
    executable = compiled.outputText;
  }
  const url = URL.createObjectURL(
    new Blob([jsWorker], { type: "text/javascript" }),
  );
  try {
    return await runWorker(new Worker(url), executable, 5000);
  } finally {
    URL.revokeObjectURL(url);
  }
}
