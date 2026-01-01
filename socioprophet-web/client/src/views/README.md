# Views

## Purpose
Route-level components that map to the SPA’s pages. Views compose lower-level components and own page layout.

## Structure
- `landing/` – Home page composition.
- `legal/` – Terms of Use and Privacy Policy pages.
- `notFound/` – 404 fallback view.

## Notes
- Views are referenced in `src/routes.js`.
- Keep shared styling for a view in the view’s own `styles.tsx` file.
