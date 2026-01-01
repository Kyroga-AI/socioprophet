# Client

## Purpose
The frontend application for SocioProphet. It is a React 18 SPA written in TypeScript and bundled with Webpack.

## Entry Points
- `src/index.tsx` – Mounts the React root.
- `src/App.tsx` – Sets up routing and global styles.

## Key Directories
- `public/` – Static HTML and assets served by Webpack Dev Server or the build output.
- `src/` – React components, views, routes, and styling.

## Tooling
- `webpack.config.js` – Webpack configuration for development and production builds.
- `babel.config.js` – Babel configuration for React + TypeScript.
- `tsconfig.json` – TypeScript compiler settings.

## Development Scripts
- `yarn start` – Launches the webpack dev server with hot reloading.
- `yarn build` – Produces a production build.
- `yarn launch` – Opens a browser window while launching the dev server.

## Notes
- The client expects the backend to serve `/api/feed/rss` for the ticker feed.
- Environment values should be placed in a `.env` file at this directory level when needed.
