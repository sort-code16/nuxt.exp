---
description: "Project conventions for creating and changing Nuxt 4 API handlers under server/api/v1/."
applyTo: "server/api/v1/**"
---

# Nuxt 4 API endpoints

The only API namespace is `/api/v1`. Add and edit endpoints under `server/api/v1/`.

- Follow Nuxt file-based routing and name handlers with an HTTP method suffix (for example, `login.post.ts`).
- Export each handler with `defineEventHandler`.
- When asked to create or change an endpoint, modify only that endpoint's handler file. Do not create or edit other files; if the request seems to require changes elsewhere, ask first.
- Before creating or changing a route, inspect the closest endpoint, relevant helpers, and callers.
- For an existing route, preserve its URL, method, response shape, and error contract unless asked to change them. For a new route, follow the request and caller; do not assume a shared response envelope.
- Require `event.context.user` only for protected operations.
- Never expose credentials or password hashes.
- Handle expected errors explicitly.
- Do not expose internal details for unexpected failures.
- Respect `nitro.ignore` in `nuxt.config.ts`; ignored files are not active endpoints or implementation examples.
