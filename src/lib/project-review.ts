import type { Project } from "./projects";

export type ProjectReview = {
  repositoryUrl: string;
  demoUrl: string;
  checked: string[];
  explanation: string;
  nextStep: string;
  updatedAt: string;
};

export const emptyProjectReview: ProjectReview = {
  repositoryUrl: "",
  demoUrl: "",
  checked: [],
  explanation: "",
  nextStep: "",
  updatedAt: "",
};

export function parseProjectReview(value: unknown): ProjectReview {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return { ...emptyProjectReview, checked: [] };
  const record = value as Record<string, unknown>;
  const field = (name: string, limit: number) =>
    typeof record[name] === "string" ? record[name].slice(0, limit) : "";
  const timestamp = field("updatedAt", 30);
  return {
    repositoryUrl: field("repositoryUrl", 500),
    demoUrl: field("demoUrl", 500),
    checked: Array.isArray(record.checked)
      ? [
          ...new Set(
            record.checked.filter(
              (item): item is string =>
                typeof item === "string" &&
                /^(test|review)-\d{1,2}$/.test(item),
            ),
          ),
        ].slice(0, 30)
      : [],
    explanation: field("explanation", 1200),
    nextStep: field("nextStep", 500),
    updatedAt:
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(timestamp) &&
      !Number.isNaN(Date.parse(timestamp))
        ? timestamp
        : "",
  };
}

export function projectReviewChecks(project: Project) {
  return [
    ...project.testing.map((label, index) => ({
      id: `test-${index}`,
      label,
      group: "Test the working flow",
    })),
    ...project.review.map((label, index) => ({
      id: `review-${index}`,
      label,
      group: "Review the result",
    })),
  ];
}

export function hasProjectReviewContent(review: ProjectReview) {
  return Boolean(
    review.repositoryUrl.trim() ||
    review.demoUrl.trim() ||
    review.checked.length ||
    review.explanation.trim() ||
    review.nextStep.trim(),
  );
}

export function isPublicHttpsUrl(value: string) {
  try {
    const url = new URL(value.trim());
    const host = url.hostname.toLowerCase();
    return (
      url.protocol === "https:" &&
      Boolean(host) &&
      host !== "localhost" &&
      !host.endsWith(".local") &&
      !host.endsWith(".internal") &&
      !/^127\./.test(host) &&
      !/^10\./.test(host) &&
      !/^192\.168\./.test(host) &&
      !/^172\.(1[6-9]|2\d|3[01])\./.test(host) &&
      host !== "[::1]" &&
      url.username === "" &&
      url.password === ""
    );
  } catch {
    return false;
  }
}

export function projectReviewReadiness(
  project: Project,
  review: ProjectReview,
) {
  const checks = projectReviewChecks(project);
  const passed = checks.filter((check) =>
    review.checked.includes(check.id),
  ).length;
  const repositoryReady = isPublicHttpsUrl(review.repositoryUrl);
  const demoReady = isPublicHttpsUrl(review.demoUrl);
  const sameLink =
    repositoryReady &&
    demoReady &&
    new URL(review.repositoryUrl.trim()).href ===
      new URL(review.demoUrl.trim()).href;
  const explanationReady = review.explanation.trim().length >= 20;
  const ready =
    repositoryReady &&
    demoReady &&
    !sameLink &&
    explanationReady &&
    passed === checks.length;
  const nextAction = !repositoryReady
    ? "Add the HTTPS link to your source repository."
    : !demoReady
      ? "Publish the project and add its HTTPS demo link."
      : sameLink
        ? "Use separate links for the source code and the live demo."
        : passed < checks.length
          ? `Work through the remaining ${checks.length - passed} review checks.`
          : !explanationReady
            ? "Explain what you built and one engineering choice in at least 20 characters."
            : "Your review is ready to export and share.";
  return { ready, passed, total: checks.length, nextAction };
}

export function projectReviewMarkdown(project: Project, review: ProjectReview) {
  const checks = projectReviewChecks(project);
  const readiness = projectReviewReadiness(project, review);
  const answer = (value: string) => value.trim() || "Not added yet";
  return [
    `# ${project.title} — project review`,
    "",
    `Status: ${readiness.ready ? "Ready to share" : "Draft"}`,
    `Repository: ${answer(review.repositoryUrl)}`,
    `Live demo: ${answer(review.demoUrl)}`,
    "",
    "## What I built and why",
    answer(review.explanation),
    "",
    "## Checks I performed",
    ...checks.map(
      (check) =>
        `${review.checked.includes(check.id) ? "[x]" : "[ ]"} ${check.label}`,
    ),
    "",
    "## Next improvement",
    answer(review.nextStep),
    "",
    "Checks are self-reported. Review the repository and demo before relying on this summary.",
    "",
  ].join("\n");
}
