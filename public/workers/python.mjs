import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.29.1/full/pyodide.mjs";

let runtime;

self.onmessage = async ({ data }) => {
  const output = [];
  const record = (line) => {
    if (output.length < 200) output.push(line.slice(0, 2000));
  };
  try {
    runtime ??= await loadPyodide();
    runtime.setStdout({ batched: record });
    runtime.setStderr({ batched: record });
    const result = await runtime.runPythonAsync(data.code);
    self.postMessage({
      ok: true,
      output,
      value: result == null ? "" : String(result),
    });
  } catch (error) {
    self.postMessage({ ok: false, output, error: String(error) });
  }
};
