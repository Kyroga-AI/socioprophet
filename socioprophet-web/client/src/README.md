# Client Source

## Purpose
Contains the React application source code, including routing, views, components, and shared styling.

## Core Files
- `index.tsx` – React entry point that mounts `<App />`.
- `App.tsx` – Applies global styles and routes.
- `routes.js` – Route definitions for the SPA.
- `routes.d.ts` – Type definitions to support the `routes` module.
- `globalStyles.tsx` – Global CSS reset and theme defaults via styled-components.

## Structure
- `components/` – Reusable UI components (header, footer, ticker feed, etc.).
- `views/` – Page-level layouts mapped in `routes.js`.
- `constants/` – Shared configuration values such as URL mappings.

## Notes
- Route-level components live under `views/` and should orchestrate components rather than implement styling directly.
- Favor `styled-components` for styles to keep visuals co-located with components.
