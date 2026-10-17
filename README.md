# UrbanRide

A responsive ride-booking concept built with Next.js and React. The project demonstrates a route-selection flow, destination suggestions, sample ride options and an optional Mapbox map. It does not connect to a ride provider or book real trips.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The illustrated Kolkata map works without credentials. To load the interactive Mapbox map, add a public Mapbox token to `.env.local`:

```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-restricted-public-token
```

Restrict the token to the deployed site’s allowed URLs in the Mapbox dashboard. Never use a secret or server-side Mapbox token in this variable.

## Scripts

- `npm run dev` — start the local development server
- `npm run lint` — check the project with Biome
- `npm run build` — create a production build
- `npm run start` — serve a production build

## Routes

- `/` — ride landing and pickup/destination form
- `/search` — destination suggestions
- `/confirm` — sample vehicle comparison and trip review
- `/login` — local demo profile sign-in used to complete a sample trip

All fares, times, and destinations are illustrative. The demo profile and trip receipt are stored only in the current browser; this is not secure account authentication. No location is sent to a ride service and no payment is processed.
