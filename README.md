# Stocks Portfolio

A personal stock portfolio tracker built with React 18 and TypeScript. Visualize your holdings, track daily gains and losses, and monitor overall portfolio performance — all with a polished UI that supports both Light and Glassmorphism Dark themes.

## Features

- **Portfolio Dashboard** — total portfolio value, daily gain/loss with color indicators, and a top holdings summary
- **Light / Dark Theming** — instant theme switching via CSS custom properties; dark mode uses a Glassmorphism aesthetic
- **StockService abstraction** — decoupled data layer with mock data, designed for future REST/GraphQL integration

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | CSS Modules + CSS Custom Properties |
| State | React Context API |
| Linting | ESLint + TypeScript rules |
| Formatting | Prettier |

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Backend API Contract

The frontend delegates all data fetching to `StockService`, which expects the following backend endpoints:

### `GET /portfolio/summary`

Returns the full portfolio overview.

**Response**
```json
{
  "totalValue": 27891.45,
  "dailyGain": 452.18,
  "dailyGainPercentage": 1.25,
  "positions": [
    {
      "id": "1",
      "ticker": "AAPL",
      "companyName": "Apple Inc.",
      "shares": 10,
      "avgCost": 150.00,
      "currentPrice": 185.92,
      "lastUpdate": "2026-02-28T12:00:00.000Z"
    }
  ]
}
```

**Types**

```typescript
interface PortfolioSummary {
  totalValue: number;          // Total market value of all positions
  dailyGain: number;           // Absolute daily gain/loss in USD
  dailyGainPercentage: number; // Daily gain/loss as a percentage
  positions: StockPosition[];
}

interface StockPosition {
  id: string;
  ticker: string;              // Stock symbol (e.g. "AAPL")
  companyName: string;
  shares: number;
  avgCost: number;             // Average cost basis per share in USD
  currentPrice: number;        // Latest market price per share in USD
  lastUpdate: string;          // ISO 8601 timestamp
}
```

> Currently running against mock data in `src/services/StockService.ts`. Swap the implementation to point at a real backend without any component changes.

## Project Structure

```
src/
  components/   # Reusable UI primitives
  features/     # Feature-scoped views and logic
  services/     # Data fetching (StockService)
  hooks/        # Custom React hooks
  styles/       # Global styles and CSS variables
  types/        # Shared TypeScript interfaces
```
