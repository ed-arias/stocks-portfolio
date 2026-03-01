## Why

The dashboard currently shows portfolio totals but gives no visual breakdown of how capital is distributed across asset classes. Users cannot quickly see if they are over-concentrated in a single class (e.g., 90% stocks) or how diversified their portfolio actually is — a fundamental insight every serious portfolio tool provides.

## What Changes

- Add an asset allocation donut chart to the dashboard displaying portfolio weight by asset class (Stocks, ETFs, Crypto, Cash)
- Add `assetClass` field to `StockPosition` (pre-assigned by the service layer)
- Add `assetAllocation` breakdown to `PortfolioSummary` (pre-computed by the service)
- Render a new chart card on the dashboard alongside the existing summary cards

## Capabilities

### New Capabilities

- `asset-allocation-chart`: Interactive donut chart showing portfolio breakdown by asset class — segments for Stocks, ETFs, Crypto, and Cash; each segment displays label, percentage, and absolute value; hovering a segment highlights it and shows a tooltip; a legend below (or beside) the chart maps colors to asset classes.

### Modified Capabilities

- `service-contract`: Add `assetClass` field to `StockPosition` and `assetAllocation: AssetAllocationBreakdown[]` to `PortfolioSummary`. The backend pre-computes all allocation percentages — the frontend only formats and renders.
- `dashboard-ui`: Add the new allocation chart card to the dashboard layout between the summary cards row and the holdings table.

## Impact

- `src/types/index.ts` — new `AssetClass` union type, `AssetAllocationBreakdown` interface; extended `StockPosition` and `PortfolioSummary`
- `src/services/StockService.ts` — mock data gains `assetClass` per position; summary gains `assetAllocation` array
- `src/features/AssetAllocationChart/` — new feature component (chart + legend)
- `src/App.tsx` — render new chart card in dashboard layout
- `src/App.css` / `src/index.css` — chart card styles, donut colors per asset class
- No new external dependencies — chart implemented with SVG (no charting library needed for a simple donut)
