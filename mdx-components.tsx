import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    h2: ({ children, ...props }) => {
      const id = String(children)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },
  };
}
