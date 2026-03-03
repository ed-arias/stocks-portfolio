# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!--
Best practices:
  - Keep an [Unreleased] section at the top to track upcoming changes.
  - Use ISO 8601 dates (YYYY-MM-DD) for all release entries.
  - Group changes under: Added | Changed | Deprecated | Removed | Fixed | Security.
  - Latest version comes first.
  - Changelogs are for humans — avoid raw commit log dumps.
  - Highlight breaking changes and deprecations explicitly.
-->

## [Unreleased]

### Added
- **Sortable holdings table columns** (feature 2.9) — all columns in the holdings table are now clickable to sort; clicking a header cycles through ascending → descending → default order with a ↑/↓ indicator on the active column; sort is session-only (not persisted); hiding the active sort column via the column picker resets sort to default
- **Customizable holdings table columns** (feature 2.8) — pill-shaped "Columns" button with a grid icon in the holdings header opens an animated popover with iOS-style toggle switches to show/hide any of the 8 optional columns (Ticker is always visible); button turns accent-blue when open; toggle thumb animates with spring easing; preferences persisted to `localStorage` under `holdings-visible-columns` and restored on page load; missing keys default to visible
- **Per-holding total return column** (feature 2.7) — new "Total Return" column in the holdings table showing total return per position (capital gains + dividends received), stacked currency/percentage with green/red color coding; `totalReturn` and `totalReturnPercentage` added to `StockPosition` and pre-computed by the service layer
- **Per-holding dividend yield column** (feature 2.6) — new "Div. Yield" column in the holdings table displaying annual dividend yield % per position; non-dividend-paying assets (e.g., crypto, TSLA) render "—"; `dividendYield: number` added to `StockPosition` and pre-computed by the service layer
- **Per-holding daily change column** (feature 2.3) — new "Daily Change" column in the holdings table showing `dailyChange` (absolute, currency) and `dailyChangePercentage` (%) stacked vertically, color-coded green/red; reuses the existing `.pl-cell` / `.pl-pct` layout; no new data required as both fields are already on `StockPosition`
- **Unified allocation explorer** (feature 1.13) — collapses the two stacked `AllocationChart` cards into a single card with an iOS-style segmented pill selector; switching between "Asset Class" and "Holdings" replays the donut entry animation via `key`-based remount; adding future allocation dimensions (sector, geography, market cap) requires only appending to the `views` array in `App.tsx` — no component changes needed
- **`AllocationExplorer` component** (`src/features/AllocationExplorer/AllocationExplorer.tsx`) — dimension-aware wrapper around `AllocationChart`; accepts `views: AllocationDimension[]`; owns active dimension state; renders the segmented pill selector and delegates chart rendering to `AllocationChart`
- **`AllocationDimension` interface** defined in `AllocationExplorer.tsx` — bundles `key`, `label`, `title`, `data`, `colorFn`, and `labelFn` for each allocation view
- **Holdings weight donut chart** (feature 1.12) — second `AllocationChart` on the dashboard showing per-position portfolio weight; each segment uses the position's asset class color for visual consistency with the asset allocation chart; tooltip shows ticker, company name, value, and weight %
- Generic `AllocationChart` component (`src/features/AllocationChart/AllocationChart.tsx`) — replaces `AssetAllocationChart`; accepts `data: AllocationBreakdown[]`, `title`, `colorFn`, and `labelFn` props; all color/label logic is supplied by the caller, enabling any allocation dimension without modifying the component
- `AllocationBreakdown` interface exported from `src/types/index.ts` — generic allocation type with `key: string`, `value`, `percentage`, and optional `assetClass`
- `allocations: { byAssetClass, byHolding }` object on `PortfolioSummary` — replaces `assetAllocation`; `byHolding` has one entry per position (key = ticker) pre-computed by the backend
- ~~Second allocation skeleton block in the loading shimmer for the holdings weight chart~~ — merged into single explorer skeleton (see feature 1.13)
- Asset allocation donut chart on the dashboard (between history chart and holdings table) showing portfolio breakdown by asset class (Stocks, ETFs, Crypto, Cash) with hover tooltips and a color-coded legend
- `AssetClass` union type exported from `src/types/index.ts`
- `assetClass` field on `StockPosition` — assigned by backend
- Four CSS custom property tokens for asset class colors: `--asset-stock`, `--asset-etf`, `--asset-crypto`, `--asset-cash` (light and dark variants)
- Mock positions expanded with VOO (ETF) and BTC (crypto) entries
- Allocation chart skeleton block in the loading shimmer, positioned between the history chart and holdings table

### Changed
- **BREAKING** Replaced `AssetAllocationBreakdown` interface with generic `AllocationBreakdown` — `assetClass: AssetClass` key renamed to `key: string`; `AssetAllocationBreakdown` is removed
- **BREAKING** Removed `portfolioWeight` from `StockPosition` — per-holding weight data is now available exclusively via `portfolio.allocations.byHolding`
- **BREAKING** Replaced `assetAllocation: AssetAllocationBreakdown[]` on `PortfolioSummary` with `allocations: { byAssetClass: AllocationBreakdown[]; byHolding: AllocationBreakdown[] }`
- `AssetAllocationChart` component deleted and replaced by generic `AllocationChart`
- `README.md` Backend API Contract updated to reflect new `allocations` shape and removal of `portfolioWeight`

### Removed
- Backlog feature 2.4 (per-holding portfolio weight column in holdings table) — superseded by the holdings weight donut chart (feature 1.12)
- Portfolio value history chart on the dashboard with period selector (1W / 1M / 3M / YTD / 1Y / All), gradient area fill, custom tooltip, and full light/dark theme support
- `PortfolioChart` feature component using Recharts `AreaChart` with responsive container
- `Period` union type and `PortfolioHistoryPoint` interface exported from `src/types/index.ts`
- `StockService.getPortfolioHistory(period)` method with mock historical data fixtures for all six periods
- Chart skeleton placeholder in the loading shimmer, positioned between summary cards and holdings table
- `GET /portfolio/history` endpoint documented in `README.md` Backend API Contract section
- Total Return summary card on the dashboard showing all-time absolute gain/loss (USD) and percentage with iOS-style pill badge

### Changed
- Moved all financial calculations (market value, unrealized gain, daily change, portfolio weight, total return) out of the frontend and into the backend service layer
- `StockService` mock now returns fully pre-computed `StockPosition` and `PortfolioSummary` data with no runtime arithmetic
- `App.tsx` render logic now reads pre-computed fields directly — no inline multiplication or division
- Extended `StockPosition` type with six backend-owned fields: `marketValue`, `unrealizedGain`, `unrealizedGainPercentage`, `dailyChange`, `dailyChangePercentage`, `portfolioWeight`
- Extended `PortfolioSummary` type with `totalReturn` and `totalReturnPercentage`
- Updated `README.md` API contract to document all new pre-computed fields

## [0.2.0] - 2026-02-28

### Changed
- Full UI redesign with Apple-inspired aesthetic (Figtree + JetBrains Mono fonts)
- Replaced flat Vite template layout with sidebar + main content grid
- Replaced generic button theme toggle with icon-based sun/moon SVG toggle
- Redesigned summary cards with iOS-style pill badges for gain/loss indicators
- Redesigned holdings table with tabular-nums, monospace data font, and company name sub-label
- New Light theme: iOS system gray palette (`#F2F2F7`) with Apple blue accent (`#0071E3`)
- New Dark theme: pure black (`#000000`) with layered surfaces and `#0A84FF` accent
- Replaced plain text loading state with shimmer skeleton that preserves the layout shell
- Added staggered `fadeUp` entrance animations on cards and table rows

## [0.1.0] - 2026-02-28

### Added
- React 19 + TypeScript + Vite project scaffold
- ESLint and Prettier configuration
- `StockService` abstraction over mock portfolio data
- `ThemeProvider` context with Light and Glassmorphism Dark theme support
- Theme toggle component with instant CSS variable switching
- Dashboard with Total Portfolio Value, Daily Gain/Loss, and Holdings Summary cards

[Unreleased]: https://github.com/ed-arias/stocks-portfolio/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/ed-arias/stocks-portfolio/releases/tag/v0.1.0
