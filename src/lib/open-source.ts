export type OpenSourceLesson = {
  path: string;
  title: string;
  summary: string;
  category:
    | "Git"
    | "GitHub"
    | "Collaboration"
    | "Automation"
    | "Reference"
    | "Practice";
  minutes: number;
  prerequisites: string[];
};

const lesson = (
  path: string,
  title: string,
  summary: string,
  category: OpenSourceLesson["category"],
  minutes: number,
  prerequisites: string[] = [],
): OpenSourceLesson => ({
  path: `/open-source/${path}`,
  title,
  summary,
  category,
  minutes,
  prerequisites,
});

export const openSourceLessons: OpenSourceLesson[] = [
  lesson(
    "git/what-is-git",
    "What is Git?",
    "Understand snapshots, history, and why version control exists.",
    "Git",
    7,
  ),
  lesson(
    "git/repository",
    "A repository is a history",
    "See what Git stores and how to create a local repository.",
    "Git",
    8,
    ["What is Git?"],
  ),
  lesson(
    "git/working-tree",
    "The working tree",
    "Separate files you are editing from commits already recorded.",
    "Git",
    7,
    ["A repository is a history"],
  ),
  lesson(
    "git/staging",
    "The staging area",
    "Choose exactly what the next commit will contain.",
    "Git",
    7,
    ["The working tree"],
  ),
  lesson(
    "git/commits",
    "Commits and history",
    "Record coherent changes and read the story they leave behind.",
    "Git",
    9,
    ["The staging area"],
  ),
  lesson(
    "git/branches",
    "Branches",
    "Develop a change without moving the shared main branch.",
    "Git",
    9,
    ["Commits and history"],
  ),
  lesson(
    "git/merge",
    "Merging changes",
    "Understand how Git combines branch histories.",
    "Git",
    8,
    ["Branches"],
  ),
  lesson(
    "git/remote",
    "Remotes and synchronization",
    "Connect local history to a shared repository deliberately.",
    "Git",
    9,
    ["Branches"],
  ),
  lesson(
    "git/merge-conflicts",
    "Resolve a merge conflict",
    "Read both edits, choose the intended result, and verify it.",
    "Git",
    9,
    ["Merging changes"],
  ),
  lesson(
    "git/commands",
    "Git command reference",
    "Use sixteen everyday commands with purpose, examples, and common mistakes.",
    "Git",
    18,
    ["What is Git?"],
  ),
  lesson(
    "github/what-is-github",
    "What is GitHub?",
    "Learn what a hosting and collaboration platform adds to Git.",
    "GitHub",
    7,
    ["What is Git?"],
  ),
  lesson(
    "github/repositories",
    "Repository structure",
    "Read the files and conventions in a real software repository.",
    "GitHub",
    8,
    ["What is GitHub?"],
  ),
  lesson(
    "github/remote",
    "Connect Git to GitHub",
    "Clone, inspect remotes, fetch, pull, and push safely.",
    "GitHub",
    9,
    ["Remotes and synchronization"],
  ),
  lesson(
    "github/issues",
    "GitHub Issues",
    "Turn a problem into a reviewable task with acceptance criteria.",
    "GitHub",
    8,
    ["What is GitHub?"],
  ),
  lesson(
    "github/discussions",
    "Discussions and decisions",
    "Know when to ask, propose, or document a decision in public.",
    "GitHub",
    7,
    ["GitHub Issues"],
  ),
  lesson(
    "forks",
    "Forks",
    "Contribute to a repository you do not control.",
    "Collaboration",
    8,
    ["Connect Git to GitHub"],
  ),
  lesson(
    "first-pull-request",
    "Your first pull request",
    "Move one change from issue to branch, checks, review, and merge.",
    "Collaboration",
    16,
    ["Branches", "Forks", "GitHub Issues"],
  ),
  lesson(
    "code-review",
    "Code review",
    "Give specific feedback on correctness, clarity, safety, and usability.",
    "Collaboration",
    10,
    ["Your first pull request"],
  ),
  lesson(
    "good-first-issues",
    "Good first issues",
    "Find small, clear contribution tasks without invented issue counts.",
    "Practice",
    7,
    ["GitHub Issues"],
  ),
  lesson(
    "ci",
    "CI and automated checks",
    "Understand what runs when a pull request is opened and why.",
    "Automation",
    9,
    ["Your first pull request"],
  ),
  lesson(
    "releases",
    "Releases and versions",
    "Connect tags, change notes, and version numbers to what users receive.",
    "Automation",
    8,
    ["CI and automated checks"],
  ),
  lesson(
    "licenses",
    "Open-source licenses",
    "Check what you may use, modify, share, and redistribute.",
    "Reference",
    8,
    ["What is GitHub?"],
  ),
  lesson(
    "readme",
    "Write a useful README",
    "Help a stranger understand, run, and evaluate a project.",
    "Reference",
    9,
    ["Repository structure"],
  ),
  lesson(
    "contributing",
    "Read CONTRIBUTING.md",
    "Follow a project's local rules before proposing a change.",
    "Reference",
    7,
    ["Repository structure"],
  ),
  lesson(
    "security",
    "Report security issues responsibly",
    "Keep secrets out of Git and report vulnerabilities privately.",
    "Reference",
    8,
    ["Repository structure"],
  ),
  lesson(
    "maintaining",
    "Maintaining an open-source project",
    "Triage, review, document, release, and set boundaries for a public project.",
    "Collaboration",
    9,
    ["Code review", "Releases and versions"],
  ),
  lesson(
    "first-contribution",
    "Make your first contribution",
    "Apply the full workflow to a real, small change.",
    "Practice",
    15,
    ["Your first pull request", "Read CONTRIBUTING.md"],
  ),
  lesson(
    "project",
    "Learn by contributing",
    "Use ZERO → HERO itself as a practical open-source project.",
    "Practice",
    8,
    ["Make your first contribution"],
  ),
];

export const openSourceSections = [
  { id: "the-problem", title: "The problem" },
  { id: "concept", title: "Concept" },
  { id: "example", title: "Example" },
  { id: "how-it-works", title: "How it works" },
  { id: "common-mistakes", title: "Common mistakes" },
  { id: "practice", title: "Practice" },
  { id: "checkpoint", title: "Checkpoint" },
];

export const openSourceStages = [
  { title: "Git fundamentals", path: "/open-source/git/what-is-git" },
  { title: "GitHub fundamentals", path: "/open-source/github/what-is-github" },
  { title: "Repositories", path: "/open-source/github/repositories" },
  { title: "Branches", path: "/open-source/git/branches" },
  { title: "Issues", path: "/open-source/github/issues" },
  { title: "Forks", path: "/open-source/forks" },
  { title: "Pull requests", path: "/open-source/first-pull-request" },
  { title: "Code review", path: "/open-source/code-review" },
  { title: "Merge conflicts", path: "/open-source/git/merge-conflicts" },
  { title: "CI / automated checks", path: "/open-source/ci" },
  { title: "Releases", path: "/open-source/releases" },
  { title: "Open-source licenses", path: "/open-source/licenses" },
  { title: "Contributing", path: "/open-source/contributing" },
  { title: "Maintaining", path: "/open-source/maintaining" },
  { title: "Your first contribution", path: "/open-source/first-contribution" },
];

export const openSourceWorkflow = [
  {
    title: "Idea",
    path: "/open-source/github/discussions",
    detail: "Discuss the need before changing code.",
  },
  {
    title: "Issue",
    path: "/open-source/github/issues",
    detail: "Define a problem and acceptance criteria.",
  },
  {
    title: "Branch",
    path: "/open-source/git/branches",
    detail: "Isolate one reviewable change.",
  },
  {
    title: "Code",
    path: "/open-source/git/working-tree",
    detail: "Make the smallest useful edit.",
  },
  {
    title: "Commit",
    path: "/open-source/git/commits",
    detail: "Record a coherent revision.",
  },
  {
    title: "Push",
    path: "/open-source/git/remote",
    detail: "Share the branch with the remote.",
  },
  {
    title: "Pull request",
    path: "/open-source/first-pull-request",
    detail: "Explain intent and invite review.",
  },
  {
    title: "CI checks",
    path: "/open-source/ci",
    detail: "Run repeatable automated checks.",
  },
  {
    title: "Review",
    path: "/open-source/code-review",
    detail: "Improve correctness and clarity together.",
  },
  {
    title: "Merge",
    path: "/open-source/git/merge",
    detail: "Integrate the reviewed change.",
  },
  {
    title: "Release",
    path: "/open-source/releases",
    detail: "Ship a known revision to users.",
  },
  {
    title: "Maintain",
    path: "/open-source/maintaining",
    detail: "Respond to feedback and keep it healthy.",
  },
];

export const openSourceChecklist = [
  {
    id: "git",
    label: "I understand Git",
    path: "/open-source/git/what-is-git",
  },
  {
    id: "clone",
    label: "I can clone a repository",
    path: "/open-source/github/remote",
  },
  {
    id: "branch",
    label: "I can create a branch",
    path: "/open-source/git/branches",
  },
  {
    id: "commit",
    label: "I understand commits",
    path: "/open-source/git/commits",
  },
  { id: "push", label: "I can push changes", path: "/open-source/git/remote" },
  {
    id: "issue",
    label: "I understand issues",
    path: "/open-source/github/issues",
  },
  { id: "fork", label: "I understand forks", path: "/open-source/forks" },
  {
    id: "pr",
    label: "I can open a pull request",
    path: "/open-source/first-pull-request",
  },
  {
    id: "review",
    label: "I understand code review",
    path: "/open-source/code-review",
  },
  {
    id: "conflict",
    label: "I can resolve a merge conflict",
    path: "/open-source/git/merge-conflicts",
  },
  { id: "ci", label: "I understand CI", path: "/open-source/ci" },
  {
    id: "license",
    label: "I understand licenses",
    path: "/open-source/licenses",
  },
  {
    id: "contribution",
    label: "I have made an open-source contribution",
    path: "/open-source/first-contribution",
  },
];

export function getOpenSourceLesson(path: string) {
  return openSourceLessons.find((item) => item.path === `/open-source/${path}`);
}
