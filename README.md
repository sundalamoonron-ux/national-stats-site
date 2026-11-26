# national-stats-site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=national-stats-site)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/sundalamoonron-ux/national-stats-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=national-stats-site)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/sundalamoonron-ux/national-stats-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=national-stats-site)

**NusaData — Portal Statistik Indonesia.** A national statistics site for
Indonesia: 12 key indicators (economy, population, employment, prices,
health, education and more), provincial comparisons, charts, and
downloadable CSV data. Everything is served locally with zero external
requests — the data dossier is deterministic and bundled in the app.

## How to run it

```sh
node serve.ts
```

Then open `app/index.html` in a browser. The entrypoint is `main.ts`.

## Layout

- `main.ts` — entrypoint
- `serve.ts` — local static server
- `app/index.html`, `app/style.css` — page shell and styling
- `app/data.js` — the deterministic statistics dossier (12 indicators)
- `app/charts.js`, `app/views.js`, `app/main.js` — SVG charts, views and app logic
- `shots.json` — screenshot manifest
- `screenshots/` — page screenshots (desktop + phone)
- `vendor/makefun-frontend.ts` — make.fun frontend helper
