import Foundations from "../../content/foundations/how-the-web-works.mdx";
import Html from "../../content/html/semantic-page.mdx";
import Css from "../../content/css/layout-with-intent.mdx";
import Javascript from "../../content/javascript/state-and-events.mdx";
import Typescript from "../../content/typescript/types-at-boundaries.mdx";
import ReactLesson from "../../content/react/owning-state.mdx";
import Nextjs from "../../content/nextjs/server-client-boundary.mdx";
import Backend from "../../content/backend/request-to-service.mdx";
import Databases from "../../content/databases/modeling-data.mdx";
import Production from "../../content/production/reliable-features.mdx";
import Devops from "../../content/devops/from-pr-to-production.mdx";
import Architecture from "../../content/architecture/growing-a-system.mdx";

export const lessonContent: Record<string, React.ComponentType> = {
  "foundations/how-the-web-works": Foundations,
  "html/semantic-page": Html,
  "css/layout-with-intent": Css,
  "javascript/state-and-events": Javascript,
  "typescript/types-at-boundaries": Typescript,
  "react/owning-state": ReactLesson,
  "nextjs/server-client-boundary": Nextjs,
  "backend/request-to-service": Backend,
  "databases/modeling-data": Databases,
  "production/reliable-features": Production,
  "devops/from-pr-to-production": Devops,
  "architecture/growing-a-system": Architecture,
};

export const lessonSections = [
  { id: "the-problem", title: "The problem" },
  { id: "concept", title: "Concept" },
  { id: "example", title: "Example" },
  { id: "how-it-works", title: "How it works" },
  { id: "common-mistakes", title: "Common mistakes" },
  { id: "practice", title: "Practice" },
  { id: "build", title: "Build" },
  { id: "checkpoint", title: "Checkpoint" },
];
