export type Language = "javascript" | "typescript" | "python" | "html" | "cpp";

export const languages: Record<
  Language,
  {
    name: string;
    extension: string;
    runtime: string;
    available: boolean;
    starter: string;
  }
> = {
  javascript: {
    name: "JavaScript",
    extension: "js",
    runtime: "Browser worker",
    available: true,
    starter: 'console.log("Hello, World!");',
  },
  typescript: {
    name: "TypeScript",
    extension: "ts",
    runtime: "Browser worker",
    available: true,
    starter: 'const message: string = "Hello, World!";\nconsole.log(message);',
  },
  python: {
    name: "Python",
    extension: "py",
    runtime: "Pyodide WebAssembly worker",
    available: true,
    starter: 'print("Hello, World!")',
  },
  html: {
    name: "HTML / CSS",
    extension: "html",
    runtime: "Sandboxed browser preview",
    available: true,
    starter:
      '<!doctype html>\n<html lang="en">\n  <head><style>body { font: 18px system-ui; padding: 2rem; }</style></head>\n  <body><h1>Hello, World!</h1><p>Edit this page.</p></body>\n</html>',
  },
  cpp: {
    name: "C++",
    extension: "cpp",
    runtime: "Local compiler required",
    available: false,
    starter:
      '#include <iostream>\n\nint main() {\n  std::cout << "Hello, World!\\n";\n  return 0;\n}',
  },
};

export function explainError(error: string, language: Language): string | null {
  if (
    language === "python" &&
    /NameError: name ['\"](.*?)['\"] is not defined/.test(error)
  ) {
    const name = error.match(
      /NameError: name ['\"](.*?)['\"] is not defined/,
    )?.[1];
    return `Python could not find “${name}”. Check the spelling and make sure it is defined before you use it.`;
  }
  if (/SyntaxError/.test(error))
    return "The code could not be parsed. Check nearby punctuation, quotes, and brackets.";
  if (/ReferenceError/.test(error))
    return "A name was used before it was defined. Check its spelling and declaration.";
  return null;
}
