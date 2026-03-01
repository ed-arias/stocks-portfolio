## 1. Dependencies & Types

- [x] 1.1 Install Recharts: `npm install recharts`
- [x] 1.2 Add `Period` union type to `src/types/index.ts` (`'1W' | '1M' | '3M' | 'YTD' | '1Y' | 'All'`)
- [x] 1.3 Add `PortfolioHistoryPoint` interface to `src/types/index.ts` (`date: string`, `value: number`)

## 2. Service Layer

- [x] 2.1 Add static mock fixtures to `StockService.ts` — one pre-crafted `PortfolioHistoryPoint[]` array per period (1W ≈7pts, 1M ≈21pts, 3M ≈60pts, YTD, 1Y ≈252pts, All)
- [x] 2.2 Implement `getPortfolioHistory(period: Period): Promise<PortfolioHistoryPoint[]>` on `StockService` returning the matching fixture

## 3. Chart Component

- [x] 3.1 Create `src/features/PortfolioChart/PortfolioChart.tsx` with `<ResponsiveContainer>`, `<AreaChart>`, `<Area>`, `<XAxis>`, `<YAxis>`, `<Tooltip>`, `<defs><linearGradient>`
- [x] 3.2 Add period selector pill-group (six buttons: 1W / 1M / 3M / YTD / 1Y / All) with `useState` for active period, defaulting to `1M`
- [x] 3.3 Fetch chart data via `StockService.getPortfolioHistory(activePeriod)` on mount and on period change
- [x] 3.4 Implement custom `<Tooltip>` content component showing formatted value (`formatCurrency`) and date
- [x] 3.5 Read `--accent` CSS custom property via `getComputedStyle` at render time and apply to `<linearGradient>` stops
- [x] 3.6 Create `src/features/PortfolioChart/PortfolioChart.css` — pill-group styles, chart container, active-period button style using `--accent`, tooltip styles using `--surface` and `--border`

## 4. Dashboard Integration

- [x] 4.1 Import `PortfolioChart` in `App.tsx` and mount it between the `.summary-cards` grid and the `.holdings-section`
- [x] 4.2 Add chart skeleton block to the loading shimmer in `App.tsx` (positioned between card skeletons and table skeleton)
- [x] 4.3 Add chart section layout styles to `App.css` (padding, margin, consistent horizontal alignment with cards and table)

## 5. Documentation

- [x] 5.1 Add `GET /portfolio/history` endpoint to `README.md` Backend API Contract section — include query param `period`, response schema (`PortfolioHistoryPoint[]`), and TypeScript types
- [x] 5.2 Update `CHANGELOG.md` under `## [Unreleased]` → `Added` with the chart feature entry

## 6. Verification

- [x] 6.1 Run `npm run build` — confirm zero TypeScript errors
- [x] 6.2 Run `npm run lint` — confirm zero ESLint errors
- [ ] 6.3 Visually verify: chart renders in light theme, period buttons switch data, tooltip appears on hover
- [ ] 6.4 Visually verify: chart re-themes correctly when toggling to dark mode
- [ ] 6.5 Visually verify: chart section is present in the loading skeleton
