# Components

## Purpose
Reusable UI building blocks for the SocioProphet frontend.

## Component Groups
- `header/` – Global navigation bar and title.
- `footer/` – Footer links and copyright line.
- `headerLink/` – Small link wrapper used by the header.
- `logo/` – Hero logo image component.
- `main/` – Hero banner and feature section layout.
- `featureItem/` – Individual feature card used in the landing page.
- `tickerFeed/` – RSS ticker that streams feed entries across the top of the page.

## Conventions
- Each component typically has a `.tsx` implementation and a `styles.tsx` file with styled-components.
- Keep components focused and composable; avoid routing or global state here.
