# Hacker News

A small React + Vite Hacker News client with feed navigation and a lightweight stats view.

## Features

- Browse Hacker News feeds: `top`, `new`, `best`, `show`, and `job`
- Open stories in a clean card-based layout
- View a simple `/stats` dashboard for top-story score trends
- Route-level code splitting for smaller initial bundles

## Stack

- React 19
- Vite 8
- React Router 7
- Recharts
- Lucide React
- date-fns

## Getting Started

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The Vite dev server will start on a local port such as `http://localhost:5173`.

### Production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Routes

- `/top`
- `/new`
- `/best`
- `/show`
- `/job`
- `/stats`

The root route `/` redirects to `/top`.

## Data Source

The app reads from the public Hacker News Firebase API:

- `https://hacker-news.firebaseio.com/v0`

Feed data is fetched client-side in [src/api/hn.js](/Users/rodin/Workspace/algovate/hacker-news/src/api/hn.js).

## Project Structure

```text
src/
  api/
    hn.js
  components/
    Sidebar.jsx
    StoryCard.jsx
  pages/
    Feed.jsx
    Stats.jsx
```

## Notes

- The stats page samples a small set of top stories and is intended as a quick snapshot, not a full analytics pipeline.
- Build output is split so the charting code for `/stats` does not inflate the main feed bundle.
