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
  "totalReturn": 5241.53,
  "totalReturnPercentage": 23.14,
  "positions": [
    {
      "id": "1",
      "ticker": "AAPL",
      "companyName": "Apple Inc.",
      "shares": 10,
      "avgCost": 150.00,
      "currentPrice": 185.92,
      "lastUpdate": "2026-02-28T16:00:00.000Z",
      "marketValue": 1859.20,
      "unrealizedGain": 359.20,
      "unrealizedGainPercentage": 23.95,
      "dailyChange": 18.50,
      "dailyChangePercentage": 1.00,
      "assetClass": "stock",
      "portfolioWeight": 6.67
    }
  ],
  "assetAllocation": [
    { "assetClass": "stock",  "value": 16971.53, "percentage": 60.85 },
    { "assetClass": "etf",    "value":  8000.00, "percentage": 28.68 },
    { "assetClass": "crypto", "value":  2919.92, "percentage": 10.47 }
  ]
}
```

**Types**

```typescript
interface PortfolioSummary {
  totalValue: number;            // Total market value of all positions
  dailyGain: number;             // Absolute daily gain/loss in USD
  dailyGainPercentage: number;   // Daily gain/loss as a percentage
  totalReturn: number;           // All-time absolute gain/loss in USD
  totalReturnPercentage: number; // All-time return as a percentage
  positions: StockPosition[];
}

interface StockPosition {
  id: string;
  ticker: string;                      // Stock symbol (e.g. "AAPL")
  companyName: string;
  shares: number;
  avgCost: number;                     // Average cost basis per share in USD
  currentPrice: number;                // Latest market price per share in USD
  lastUpdate: string;                  // ISO 8601 timestamp
  // Pre-computed by backend
  marketValue: number;                 // shares × currentPrice
  unrealizedGain: number;              // marketValue − (shares × avgCost)
  unrealizedGainPercentage: number;    // unrealizedGain / costBasis × 100
  dailyChange: number;                 // Absolute $ change today for this position
  dailyChangePercentage: number;       // % change today for this position
  assetClass: AssetClass;              // Asset class assigned by backend
  portfolioWeight: number;             // marketValue / totalPortfolioValue × 100
}

type AssetClass = 'stock' | 'etf' | 'crypto' | 'cash';

interface AssetAllocationBreakdown {
  assetClass: AssetClass;
  value: number;      // Total market value of this class in USD
  percentage: number; // Share of total portfolio value (0–100); pre-computed by backend
  // Note: display labels are a frontend concern (see LABEL_MAP in AssetAllocationChart)
}
```

### `GET /portfolio/history`

Returns portfolio total value over time for a given period.

**Query Parameters**

| Parameter | Type | Values |
|---|---|---|
| `period` | string | `1W` `1M` `3M` `YTD` `1Y` `All` |

**Period reference**

| Period | Granularity | Approx. points | Coverage |
|---|---|---|---|
| `1W` | Daily (trading days only) | ~5 | Last 7 calendar days |
| `1M` | Daily (trading days only) | ~21 | Last 30 calendar days |
| `3M` | Daily (trading days only) | ~65 | Last 90 calendar days |
| `YTD` | Daily (trading days only) | ~40 | Jan 1 to present |
| `1Y` | Weekly (every 7 days) | ~52 | Last 12 months |
| `All` | Bi-weekly (every 14 days) | ~52+ | Full portfolio history |

Weekends and market holidays are excluded from daily-granularity periods. The final data point always reflects the current portfolio `totalValue`.

**Response**
```json
[
  { "date": "2026-02-03", "value": 26512.00 },
  { "date": "2026-02-04", "value": 26734.45 }
]
```

**Types**

```typescript
type Period = '1W' | '1M' | '3M' | 'YTD' | '1Y' | 'All';

interface PortfolioHistoryPoint {
  date: string;  // ISO 8601 date: YYYY-MM-DD
  value: number; // Portfolio total value in USD
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
