# Backend Requirements

This file tracks backend infrastructure and API features that have no immediate implementation but are required to make the app production-ready. The frontend currently runs entirely on mock data — no real backend exists yet.

Backend work is organized by domain. Each item describes what is needed and why, along with which frontend features depend on it.

---

## Domain 1 — Authentication & User Accounts

| # | Requirement | Notes |
|---|---|---|
| B1.1 | User registration and login (email + password) | Prerequisite for all server-side persistence |
| B1.2 | OAuth login (Google, GitHub) | Reduces friction; common in peer apps |
| B1.3 | Session / JWT token management | Required for secure API calls |
| B1.4 | Password reset flow | Standard auth requirement |
| B1.5 | User profile endpoint (`GET /api/me`) | Returns user ID, email, display name |

---

## Domain 2 — User Preferences

These are currently stored in `localStorage` (per-browser, per-device). Moving them to the backend enables cross-device sync.

| # | Requirement | Frontend feature | localStorage key (current) |
|---|---|---|---|
| B2.1 | Persist holdings table column visibility | Feature 2.8 — Customizable columns | `holdings-visible-columns` |
| B2.2 | Persist UI theme preference (light/dark) | Feature 14.1 — Theme toggle | `theme` |
| B2.3 | Persist dashboard layout preferences | Feature 14.5 — Customizable dashboard (P2) | — |
| B2.4 | Persist active allocation dimension | Feature 1.13 — Allocation explorer | — |

**Suggested API shape:**
```
GET  /api/preferences          → { columns: {...}, theme: 'dark', ... }
PATCH /api/preferences         → partial update, returns updated object
```

---

## Domain 3 — Portfolio Data Persistence

Currently all portfolio data is hardcoded in `StockService.ts`. A real backend would own this data.

| # | Requirement | Notes |
|---|---|---|
| B3.1 | `GET /api/portfolio` — returns `PortfolioSummary` | Replaces mock; pre-computes all derived fields server-side |
| B3.2 | `GET /api/portfolio/history?period=` — returns `PortfolioHistoryPoint[]` | Replaces mock history |
| B3.3 | `GET /api/positions` — returns `StockPosition[]` | Supports paginated holdings table |
| B3.3a | `GET /api/positions/closed` — returns `ClosedPosition[]` | Feature 2.12 — Closed / historical positions view (P2) |
| B3.4 | `POST /api/transactions` — record a buy/sell/dividend | Feature 12.1 — Manual transaction entry (P0) |
| B3.5 | `PUT /api/transactions/:id` / `DELETE /api/transactions/:id` | Feature 12.2 — Edit/delete transactions (P0) |
| B3.6 | `POST /api/transactions/import` — CSV import | Feature 12.3 — CSV import (P1) |

---

## Domain 4 — Market Data

The frontend currently uses hardcoded prices. A real backend would fetch and cache live market data.

| # | Requirement | Notes |
|---|---|---|
| B4.1 | Intraday price feed (per ticker) | Required for real-time price updates |
| B4.2 | Daily OHLCV history (per ticker) | Required for portfolio value history chart |
| B4.3 | Dividend data (yield, ex-date, payment date) | Required for Epic 5 — Dividend Tracking |
| B4.4 | Fundamental data (P/E, market cap, sector) | Required for Epic 13 — Stock Screener |
| B4.5 | Analyst ratings and price targets | Feature 2.13, 8.4 |
| B4.6 | Earnings calendar | Feature 9.1 |

**Suggested providers:** Alpha Vantage, Polygon.io, Yahoo Finance (unofficial), Financial Modeling Prep

---

## Domain 5 — Notifications & Alerts

| # | Requirement | Notes |
|---|---|---|
| B5.1 | Store user-defined price alerts | Feature 7.1 — Price target alerts (P1) |
| B5.2 | Background job to evaluate alert conditions | Runs on price tick or end-of-day |
| B5.3 | Notification delivery (email, push, or in-app) | Feature 7.x — Alerts (P1/P2) |

---

## Domain 6 — Multi-Portfolio Support

| # | Requirement | Notes |
|---|---|---|
| B6.1 | `GET /api/portfolios` — list user portfolios | Feature 1.9 — Multi-portfolio support (P2) |
| B6.2 | `POST /api/portfolios` — create portfolio | |
| B6.3 | `DELETE /api/portfolios/:id` — delete portfolio | |
| B6.4 | Portfolio-scoped versions of all position/transaction endpoints | |

---

## API Contract

The frontend delegates all data fetching to `StockService`. When a real backend is introduced, only `StockService.ts` needs to change — no component changes required.

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
      "assetClass": "stock",
      "marketValue": 1859.20,
      "unrealizedGain": 359.20,
      "unrealizedGainPercentage": 23.95,
      "dailyChange": 18.50,
      "dailyChangePercentage": 1.00,
      "dividendYield": 0.44,
      "totalReturn": 392.36,
      "totalReturnPercentage": 26.16,
      "transactions": [
        { "id": "aapl-1", "date": "2023-06-12", "type": "buy",      "shares": 10,   "price": 150.00, "amount": 1500.00 },
        { "id": "aapl-2", "date": "2024-05-17", "type": "dividend", "shares": null, "price": null,   "amount":    3.65 }
      ],
      "analystRating": { "label": "Buy", "analystCount": 31 },
      "fairValue": { "price": 210.00, "source": "Morningstar" }
    }
  ],
  "allocations": {
    "byAssetClass": [
      { "key": "stock",  "value": 16971.53, "percentage": 60.85 },
      { "key": "etf",    "value":  8000.00, "percentage": 28.68 },
      { "key": "crypto", "value":  2919.92, "percentage": 10.47 }
    ],
    "byHolding": [
      { "key": "AAPL", "value":  1859.20, "percentage":  6.67 },
      { "key": "TSLA", "value":   987.90, "percentage":  3.54 },
      { "key": "NVDA", "value": 10891.95, "percentage": 39.05 },
      { "key": "MSFT", "value":  3232.48, "percentage": 11.59 },
      { "key": "VOO",  "value":  8000.00, "percentage": 28.68 },
      { "key": "BTC",  "value":  2919.92, "percentage": 10.47 }
    ]
  }
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
  allocations: {
    byAssetClass: AllocationBreakdown[]; // Grouped by asset class
    byHolding: AllocationBreakdown[];    // One entry per position (key === ticker)
  };
}

type TransactionType = 'buy' | 'sell' | 'dividend' | 'split';

interface Transaction {
  id: string;
  date: string;          // ISO 8601 date: YYYY-MM-DD
  type: TransactionType;
  shares: number | null; // null for dividend; split stores ratio numerator (e.g. 10 for 10:1)
  price: number | null;  // null for dividend and split
  amount: number | null; // null for split
}

interface StockPosition {
  id: string;
  ticker: string;                      // Stock symbol (e.g. "AAPL")
  companyName: string;
  shares: number;
  avgCost: number;                     // Average cost basis per share in USD
  currentPrice: number;                // Latest market price per share in USD
  lastUpdate: string;                  // ISO 8601 timestamp
  assetClass: AssetClass;              // Asset class assigned by backend
  // Pre-computed by backend
  marketValue: number;                 // shares × currentPrice
  unrealizedGain: number;              // marketValue − (shares × avgCost)
  unrealizedGainPercentage: number;    // unrealizedGain / costBasis × 100
  dailyChange: number;                 // Absolute $ change today for this position
  dailyChangePercentage: number;       // % change today for this position
  dividendYield: number;               // Annual dividend yield % (0 for non-payers)
  totalReturn: number;                 // unrealizedGain + dividends received (USD)
  totalReturnPercentage: number;       // totalReturn / costBasis × 100
  transactions: Transaction[];         // Full transaction history; pre-populated by backend
  analystRating?: AnalystRating;       // Analyst consensus rating; undefined if no coverage
  fairValue?: FairValueEstimate;       // Fair value estimate; undefined if not available
}

interface FairValueEstimate {
  price: number;   // Estimated fair value per share in USD
  source: string;  // Data provider name (e.g., "Morningstar", "Simply Wall St")
}

interface AnalystRating {
  label: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  analystCount: number;                // Number of analysts contributing to consensus
}

// Future endpoint: GET /positions/:id/transactions → Transaction[]
// Currently embedded in StockPosition to avoid per-holding async loading.
// Revisit when transaction lists grow large enough to warrant lazy loading.

type AssetClass = 'stock' | 'etf' | 'crypto' | 'cash';

interface AllocationBreakdown {
  key: string;        // Dimension-specific identifier: asset class key, ticker, etc.
  value: number;      // Total market value in USD
  percentage: number; // Portfolio weight (0–100); pre-computed by backend
}
```

---

### `GET /positions/closed`

Returns all fully-exited positions with pre-computed realized P&L and hold period.

**Response**
```json
[
  {
    "id": "c1",
    "ticker": "MSFT",
    "companyName": "Microsoft Corporation",
    "assetClass": "stock",
    "shares": 5,
    "avgCost": 270.00,
    "exitPrice": 335.00,
    "realizedGain": 325.00,
    "realizedGainPercentage": 24.07,
    "openDate": "2022-01-10",
    "closeDate": "2023-09-15",
    "holdDays": 613
  }
]
```

**Types**

```typescript
interface ClosedPosition {
  id: string;
  ticker: string;
  companyName: string;
  assetClass: AssetClass;
  shares: number;                      // Total shares sold
  avgCost: number;                     // Average cost basis per share in USD
  exitPrice: number;                   // Weighted average exit price per share in USD
  // Pre-computed by backend
  realizedGain: number;                // (exitPrice − avgCost) × shares in USD
  realizedGainPercentage: number;      // realizedGain / costBasis × 100
  openDate: string;                    // ISO 8601 date of first buy
  closeDate: string;                   // ISO 8601 date of final sell
  holdDays: number;                    // closeDate − openDate in calendar days
}
```

---

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

---

## Migration Path

When the backend is introduced, the frontend migration is minimal by design:

1. Replace `StockService` mock implementations with real `fetch` calls — no component changes needed (data contract is already typed)
2. Replace `localStorage` reads/writes for preferences with `GET /api/preferences` + `PATCH /api/preferences` calls
3. Add an auth layer (token injection in API calls, redirect to login on 401)
