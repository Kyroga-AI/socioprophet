# API Routes

## Purpose
Defines API endpoints that the frontend consumes. This layer is responsible for converting upstream data into a lightweight JSON payload.

## Current Endpoints
- `GET /api/feed/rss` – Fetches and caches the Hacker News RSS feed. Returns an array of items with `title` and `link`.

## Key Files
- `rss-route.ts`
  - Fetches XML from `HN_URL`.
  - Uses `jsdom` to parse the RSS feed into DOM nodes.
  - Transforms `item` nodes into `{ title, link }` objects.
  - Caches the result in `node-cache` for 10 minutes.

## Notes
- New API routes should follow the same pattern: parse upstream data, normalize it, then send JSON.
- If you introduce new external calls, consider adding caching or throttling to avoid rate limits.
