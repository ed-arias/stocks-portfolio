## Why

The holdings table shows market metrics and analyst ratings but no valuation signal. Adding a fair value estimate column gives users an at-a-glance sense of whether each position is undervalued, fairly valued, or overvalued relative to an independent estimate — the most direct way to act on conviction without leaving the portfolio view.

## What Changes

- Add a `fairValue` optional field to `StockPosition` with a price estimate and source label
- Add "Fair Value" as a toggleable, sortable column in the holdings table
- Render the estimated price alongside an upside/downside percentage and a terse valuation badge (Undervalued / Fair / Overvalued)
- Populate with mock data in `StockService`

## Capabilities

### New Capabilities

- `fair-value-estimate-column`: Displays a fair value price estimate per holding with upside/downside % and a valuation badge, toggleable via the column picker and sortable by upside

### Modified Capabilities

- `service-contract`: `StockPosition` gains an optional `fairValue` field; `StockService` mock data extended

## Impact

- `src/types/index.ts` — new `FairValueEstimate` interface + optional field on `StockPosition`
- `src/services/StockService.ts` — mock data extended with `fairValue` per stock/ETF position
- `src/App.tsx` — new column registered in column definitions, sort comparator, and table renderer
- `src/index.css` / `src/App.css` — badge styles for Undervalued / Fair / Overvalued tiers
- `BACKEND.md` — `StockPosition` type block and JSON example updated
