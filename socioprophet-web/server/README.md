# Server

## Purpose
The server directory hosts a lightweight Express application that provides the RSS feed API consumed by the frontend ticker.

## Entry Points
- `src/server.ts` – Bootstraps the Express app, configures middleware, and mounts API routes.

## Runtime Responsibilities
- Serve JSON data from the Hacker News RSS feed.
- Apply middleware for compression, security headers, CORS, and session/cookie handling.
- Provide a single API namespace under `/api/feed`.

## Key Files
- `package.json` – Contains dependencies such as `express`, `jsdom`, `node-cache`, and `node-fetch`.
- `tsconfig.json` – TypeScript configuration for the server.
- `Dockerfile` – Container build instructions for deployment.
- `src/routes/api/rss-route.ts` – Implements `/api/feed/rss`.
- `src/constants/index.js` – Centralized constants (e.g., `HN_URL`).

## Environment Expectations
- `PORT` – The HTTP port the server listens on.

## Development
- `yarn run dev` – Starts the server with `nodemon`.
- `yarn start` – Runs the server directly with Node.

## Notes
- The server uses CommonJS `require` in `.ts` files; keep consistency when adding new modules.
- Responses are cached for 10 minutes using `node-cache`.
