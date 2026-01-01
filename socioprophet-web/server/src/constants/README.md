# Server Constants

## Purpose
Centralized constants used by server modules, keeping magic strings and URLs in one place.

## Current Constants
- `HN_URL` (from `index.js`) – The Hacker News RSS feed endpoint (`https://hnrss.org/newest`).

## Usage
- Imported by `src/routes/api/rss-route.ts` to fetch and cache the feed.

## Notes
- Prefer adding new shared constants here rather than duplicating values across route files.
