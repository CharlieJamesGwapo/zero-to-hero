# Authentication application starter

`policy.ts` is a small server-side domain scaffold for private notes. It defines input validation and an ownership check. Wire it into a Next.js route with a maintained authentication solution and a database. Resolve the session on the server for **every** read and write. Never accept a client-supplied user ID as proof of ownership.

This starter does not provide sign-in, session storage, database persistence, or a deployable private API. Build and test those boundaries before exposing user notes. The [project brief](../../src/lib/projects.ts) lists the required flows.
