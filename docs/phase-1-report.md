# Phase 1 report

## Built
- Vite + vanilla HTML/CSS/JavaScript foundation.
- French and English routing shell.
- Supplied APAH logos and three supplied co-founder photographs copied without alteration.
- Responsive frosted header.
- Clickable logo.
- Accessible mobile menu.
- Search dialog.
- Light and dark display modes.
- Footer with legal navigation.
- Newsletter entry point.
- Favicon and web manifest.
- Custom 404 view.
- Dynamic copyright year.
- Internal company-input register and QA documentation.

## Tested by inspection
- Layout uses `min-width: 320px` and responsive grids.
- Images use explicit dimensions.
- No `100vw` layout widths.
- No external trackers or secrets.
- Placeholder markers live in private content/docs, not public templates.
- Mobile menu has ARIA state and Escape handling.
- Search uses a native dialog.

## Still waiting for company information
See `content/company-input.md` and `docs/pre-launch-verification.md`.

## Important implementation decision
The hero does not use an unverified third-party photograph. Phase 1 uses an original gradient treatment until the company supplies an approved, licensed energy-infrastructure hero image.
