# Server Routes

## Purpose
Contains Express routers grouped by API namespace.

## Structure
- `api/` – Routes intended for client consumption (currently the RSS feed endpoint).

## Conventions
- Keep routers small and focused on a single resource or feature.
- Export routers with `module.exports = router` for consistency with the server entry point.
- Mount routers in `src/server.ts` so the route tree is visible from one place.
