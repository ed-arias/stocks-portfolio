## Why

The dashboard currently shows only point-in-time portfolio metrics (total value, daily gain, total return) with no sense of how the portfolio has performed over time. A value history chart is the single highest-impact visual addition at this stage — it transforms a static snapshot into a portfolio tracker users can actually read trends from.

## What Changes

- Add a `PortfolioHistoryPoint` type (`date: string`, `value: number`) and a `Period` union type to the shared types
- Extend `StockService` with a new `getPortfolioHistory(period: Period)` method returning mock historical data for all six periods (1W, 1M, 3M, YTD, 1Y, All)
- Add a `PortfolioChart` feature component that renders a responsive line chart with an interactive period selector pill-group
- Integrate Recharts as the charting dependency (lightweight, React-native, tree-shakeable)
- Mount the chart on the dashboard, below the three summary cards and above the holdings table
- Update `README.md` Backend API Contract section with the new `GET /portfolio/history` endpoint signature and `PortfolioHistoryPoint` type

## Capabilities

### New Capabilities

- `portfolio-history-chart`: Interactive line chart component displaying portfolio total value over time with period selectors (1W / 1M / 3M / YTD / 1Y / All), styled to match the Apple-inspired design system

### Modified Capabilities

- `service-contract`: Adding `getPortfolioHistory(period: Period): Promise<PortfolioHistoryPoint[]>` to the `StockService` interface — a new required method with its own return type
- `dashboard-ui`: Dashboard layout gains a chart section between the summary-cards row and the holdings table; period selector state is local to the chart component

## Impact

- **New dependency**: `recharts` (npm)
- **New files**: `src/features/PortfolioChart/PortfolioChart.tsx`, `src/features/PortfolioChart/PortfolioChart.css`
- **Modified files**: `src/types/index.ts`, `src/services/StockService.ts`, `src/App.tsx`, `src/App.css`, `README.md`
- **No breaking changes** to existing `PortfolioSummary` or `StockPosition` types
