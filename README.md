# EnergyMix — Frontend

Dashboard for the UK energy mix and optimal EV‑charging window. Consumes the
[EnergyMix backend](../EnergyMix-Backend).

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Recharts · i18next · Docker (nginx)

## Features

- **3‑day energy mix** — donut chart per day (today / tomorrow / day after) with the
  clean‑energy share and a hover callout per fuel.
- **Optimal charging window** — pick 1–6 h; shows the greenest slot in the next 48 h with a
  start/end time and a clean‑energy forecast strip.
- **Light / dark theme** — persisted to `localStorage`, with the stored value validated
  (garbage falls back to the system preference).
- **i18n (PL / EN)** — all copy externalised; language auto‑detected and persisted.
- **Time‑zone toggle** — UK (Europe/London) / your local zone / UTC.

## Getting started

```bash
npm install
cp .env.example .env      # point VITE_API_URL at the backend
npm run dev               # http://localhost:5173
```

The backend must be running (see its README). For a full stack in one command, use the
`docker compose` setup in the parent folder.

### Environment variables

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Backend base URL. `http://localhost:3000` in dev; empty string = same‑origin `/api` (used behind the nginx proxy). |

`VITE_API_URL` is inlined at **build time** (Vite), so it must be set when building, not at
runtime.

## Scripts

| Script | Action |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Type‑check + production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `npm run format` / `format:check` | Prettier write / check |

## Docker

Multi‑stage build: Vite compiles to static files, then **nginx** serves them and reverse‑proxies
`/api` to the backend.

```bash
docker build -t energymix-frontend .
docker run -p 8080:80 energymix-frontend    # expects a `backend` host on the same network
```

For local use, the `docker-compose.yml` in the parent folder wires the frontend and backend
together:

```bash
docker compose up --build     # http://localhost:8080
```

## Project structure

```text
src/
├── main.tsx / App.tsx      # entry + providers
├── pages/                  # MainPage (layout)
├── components/
│   ├── ui/                 # Card, Button, Badge, toggles, …
│   ├── layout/             # Header
│   ├── mix/                # donut chart, day cards, legend
│   └── charging/           # duration selector, result, forecast strip
├── hooks/                  # useEnergyMix, useChargingWindow, useTheme, useTimezone
├── context/                # theme & timezone providers
├── api/                    # backend client
├── i18n/                   # i18next config + pl/en locales
├── utils/                  # date, fuels, theme, timezone helpers
└── types/                  # shared types
```
