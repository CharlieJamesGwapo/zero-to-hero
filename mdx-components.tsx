import type { MDXComponents } from "mdx/types";
import { CodeBlock, Terminal } from "@/components/code-block";
import { GlossaryTerm } from "@/components/glossary-term";

export function useMDXComponents(): MDXComponents {
  return {
    pre: (props) => <CodeBlock {...props} />,
    Terminal,
    GlossaryTerm,
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
