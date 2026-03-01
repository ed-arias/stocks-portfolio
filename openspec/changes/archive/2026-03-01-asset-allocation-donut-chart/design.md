## Context

The dashboard already has a summary cards row and a portfolio history line chart. The data model is service-driven — the frontend never computes financial values. A new donut chart card needs to slot into this established pattern: new fields pre-computed by the service, a new feature component that reads and renders them, and a layout update in `App.tsx`.

The app currently has no charting library beyond custom SVG used in the history chart. Adding a heavy dependency (Chart.js, Recharts, D3) for a static donut would be disproportionate.

## Goals / Non-Goals

**Goals:**
- Display portfolio breakdown by asset class (Stocks, ETFs, Crypto, Cash) as an interactive donut chart
- Follow the service-driven pattern: `assetClass` per position, full `assetAllocation[]` breakdown pre-computed by the service
- Match the existing Apple-inspired design system (colors, fonts, card style, animations)
- Hover interaction on donut segments with a tooltip showing label, value, and percentage
- Color-coded legend alongside the chart

**Non-Goals:**
- Dynamic asset class discovery — the four classes (Stocks, ETFs, Crypto, Cash) are fixed for now
- Drill-down into individual holdings from the chart
- Clicking a segment to filter the holdings table (deferred to a future interaction epic)
- Animated segment transitions on data change

## Decisions

### SVG donut — no charting library
A donut chart is rendered via SVG `<circle>` elements using the `stroke-dasharray` / `stroke-dashoffset` technique. It requires ~50 lines of math, no runtime dependency, and integrates cleanly with the existing CSS token system. Recharts or Chart.js would add >200 kB to the bundle for a shape we can draw ourselves.

**Considered:** Recharts — rejected (bundle size, theming friction with CSS custom properties).

### `assetClass` on `StockPosition`, `assetAllocation[]` on `PortfolioSummary`
`assetClass: AssetClass` is an intrinsic property of each holding (AAPL is a `stock`, QQQ is an `etf`) — the backend assigns it per position. The backend also pre-aggregates an `assetAllocation: AssetAllocationBreakdown[]` array on `PortfolioSummary`, where each entry has `{ assetClass, label, value, percentage }`. The frontend only maps this array to SVG segments — no grouping or summing in the component. Consistent with the no-frontend-arithmetic rule.

### Asset class as a fixed union type
`AssetClass = 'stock' | 'etf' | 'crypto' | 'cash'` is declared in `src/types/index.ts`. Adding a new class in the future is a one-line change. A free-form `string` would lose type safety without meaningful benefit.

### Chart placement
The allocation chart card sits alongside or below the portfolio history chart, above the holdings table. This keeps the dashboard flow: totals → history trend → composition → detail.

### Per-class color tokens
Four new CSS custom properties in `index.css`: `--asset-stock`, `--asset-etf`, `--asset-crypto`, `--asset-cash`. Defined for both light and dark themes so the chart integrates with the token system. The legend reads the same tokens as the donut segments.

## Risks / Trade-offs

- **Zero-value segments** — if a user holds no crypto, that segment must be skipped entirely rather than rendering a zero-length stroke. → Guard `percentage > 0` before computing dasharray values.
- **Tooltip positioning** — native SVG `<title>` is not styleable. Use an absolutely positioned `<div>` overlay driven by `onMouseMove` state `{ x, y, segment }` instead.
- **Fixed asset classes** — real classification is a backend concern; the mock hardcodes all four. Acceptable for now.
