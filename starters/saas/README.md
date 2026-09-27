# Organization SaaS starter

`authorization.ts` models one organization boundary. Call its authorization function on the server after resolving a real session and loading the requested project and membership from the database. Add database constraints and tests for cross-organization access before a production release.

This starter does not include billing, background jobs, or a deployable API. Add them only when the core user flow needs them, following the [project brief](../../src/lib/projects.ts).
