## Context

The dashboard has two summary cards: Total Value and Daily Gain/Loss. Both are driven by `PortfolioSummary` from `StockService`. Total return (all-time) is not currently in the type or the mock — it needs to be computed from positions (current value vs. total cost basis) and surfaced as new fields.

## Goals / Non-Goals

**Goals:**
- Extend `PortfolioSummary` with `totalReturn` and `totalReturnPercentage`
- Compute total return in `StockService` from position data (no new dependency)
- Render a third card matching the existing card design system

**Non-Goals:**
- Time-weighted or money-weighted return (separate backlog items 3.4, 3.5)
- Per-holding total return column in the table (separate backlog item 2.7)
- Backend API changes (mock only for now)

## Decisions

### Total return calculation
`totalReturn = Σ(shares × currentPrice) − Σ(shares × avgCost)`
`totalReturnPercentage = totalReturn / Σ(shares × avgCost) × 100`

Computed directly in `StockService` from the existing `MOCK_POSITIONS` array. No new fields needed on `StockPosition`.

**Alternative considered:** Computing in `App.tsx` from `positions` — rejected because all financial calculations belong in the service layer, keeping the component purely presentational.

### Type extension
Add `totalReturn: number` and `totalReturnPercentage: number` to `PortfolioSummary`. Both are required fields — the backend is always expected to provide them.

**Alternative considered:** Optional fields — rejected to avoid null-checks in the UI layer.

### Card placement
Third card added to the existing `cards-grid`. The grid uses `auto-fit` with `minmax(220px, 1fr)` so it reflows automatically on narrow screens — no layout changes required.

## Risks / Trade-offs

- [Risk] `totalReturn` and `totalReturnPercentage` are simple cost-basis returns; they do not account for cash flows, dividends, or timing → acceptable for now, clearly labelled "Total Return" not "IRR"
