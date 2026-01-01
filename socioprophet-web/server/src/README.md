# Server Source

## Purpose
Holds all runtime source for the Express server.

## Structure
- `server.ts` – Application entry point; configures middleware and mounts routes.
- `routes/` – Express routers grouped by feature area.
- `constants/` – Shared constants used by routes and middleware.

## Execution Flow
1. `server.ts` loads environment variables when not in production.
2. Express middleware is registered (sessions, CORS, security headers, compression, parsers).
3. API routes are mounted at `/api/feed`.
4. The server listens on `process.env.PORT` and handles shutdown on `SIGINT`.

## Notes
- Keep route modules focused on request/response logic; share reusable values via `constants/`.
- Add new API route groups by creating a new subfolder under `routes/` and mounting it in `server.ts`.
