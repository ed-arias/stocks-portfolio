# Stocks Portfolio

A personal stock portfolio tracker built with React 19 and TypeScript. Visualize your holdings, track daily gains and losses, monitor overall portfolio performance, and analyze asset allocation — all with a polished Apple-inspired UI that supports Light and Dark themes.

## Features

- **Portfolio Dashboard** — total value, daily gain/loss, all-time total return, and allocation charts
- **Holdings Table** — positions with price, market value, daily change, profit/loss, total return, and dividend yield; click any column header to sort (ascending → descending → default) with an animated directional indicator; columns are individually toggled via a pill-shaped "Columns" picker with iOS-style toggle switches and localStorage persistence
- **Allocation Explorer** — donut chart with dimension selector (asset class, holdings weight)
- **Portfolio History Chart** — value over time with 1W / 1M / 3M / YTD / 1Y / All periods
- **Light / Dark Theming** — instant theme switching via CSS custom properties; dark mode uses a pure black iOS-inspired aesthetic

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | CSS Custom Properties (no CSS-in-JS) |
| State | React Context API |
| Linting | ESLint + TypeScript rules |

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Backend

The frontend delegates all data fetching to `StockService`, which currently runs against mock data. Swapping to a real backend only requires changing `src/services/StockService.ts` — no component changes needed.

Backend requirements, API contract, and planned infrastructure are documented in [`BACKEND.md`](./BACKEND.md).

## Project Structure

```
src/
  features/     # Feature-scoped components (charts, table, explorer)
  services/     # Data fetching (StockService)
  context/      # React context providers (ThemeContext)
  types/        # Shared TypeScript interfaces
src/index.css   # CSS custom property token system (light + dark)
src/App.css     # Layout, card, table, and animation styles
src/App.tsx     # Main feature component
```

## Roadmap

Feature backlog is tracked in [`BACKLOG.md`](./BACKLOG.md).
