export type Role = "viewer" | "editor" | "owner";
export type Membership = { userId: string; organizationId: string; role: Role };
export type Project = { id: string; organizationId: string; name: string };

export function canEditProject(
  userId: string,
  project: Project,
  memberships: Membership[],
): boolean {
  return memberships.some(
    (membership) =>
      membership.userId === userId &&
      membership.organizationId === project.organizationId &&
      (membership.role === "editor" || membership.role === "owner"),
  );
}

// Resolve userId from the server session. Never trust a userId in request JSON.
// Query memberships and project by ID, then apply this rule before any update.
