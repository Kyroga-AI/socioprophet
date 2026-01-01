# socioprophet-web

## Purpose
This directory is the root of the SocioProphet website codebase. It splits the frontend and backend into two sibling projects and keeps helper scripts for local development.

## Major Subdirectories
- `client/` – React + TypeScript single-page application bundled with Webpack.
- `server/` – Express server that powers the RSS ticker endpoint used by the client.
- `scripts/` – Shell helpers invoked by the root `Makefile` to install and run both apps.

## Key Files
- `client/package.json` – Frontend dependencies and scripts.
- `server/package.json` – Backend dependencies and scripts.
- `scripts/install_web.sh` – Installs client and server dependencies.
- `scripts/run_web.sh` – Runs server and client concurrently for local dev.

## Typical Workflow
1. Install dependencies via the root `Makefile` (`make install_web`).
2. Run both services (`make run_web`) which delegates to `scripts/run_web.sh`.
3. Client will call the server at `/api/feed/rss` to populate the ticker feed.

## Notes
- `node_modules/` folders live inside `client/` and `server/` and are intentionally excluded from documentation updates.
- Environment configuration is expected to live in `.env` files within the `client/` and `server/` directories (see root README for guidance).
