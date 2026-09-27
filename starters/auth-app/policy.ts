export type Note = { id: string; ownerId: string; title: string; body: string };
export type Session = { userId: string };

export function canReadNote(session: Session | null, note: Note): boolean {
  return Boolean(session && session.userId === note.ownerId);
}

export function parseNoteInput(
  input: unknown,
): { title: string; body: string } | null {
  if (!input || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  if (typeof value.title !== "string" || typeof value.body !== "string")
    return null;
  const title = value.title.trim();
  if (!title || title.length > 120 || value.body.length > 5000) return null;
  return { title, body: value.body };
}

// In a server route: resolve the session, query the note, then call canReadNote.
// Return no note data when the session is absent or the ownership check fails.
