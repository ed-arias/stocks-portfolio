## Context

The dashboard currently presents three point-in-time summary cards (Total Value, Daily Gain, Total Return) and a holdings table. There is no temporal dimension — users cannot see how their portfolio value has evolved. The chart fills this gap as the first data visualization feature. The codebase uses a service abstraction (`StockService`) that already isolates data concerns from UI, and CSS custom properties that make theming new components straightforward.

## Goals / Non-Goals

**Goals:**
- Render a responsive line chart showing portfolio total value over a selectable time window
- Support six period options: 1W, 1M, 3M, YTD, 1Y, All
- Style the chart and period selector to match the existing Apple-inspired design system (Figtree, JetBrains Mono, CSS tokens)
- Extend `StockService` with a `getPortfolioHistory(period)` method backed by static mock fixtures
- Add a `PortfolioHistoryPoint` type and `Period` union type to `src/types/index.ts`
- Document the new `GET /portfolio/history` endpoint in `README.md`

**Non-Goals:**
- Real-time or live-updating chart data
- Benchmark overlay (backlog item 4.1 — separate feature)
- Multiple chart types (candlestick, bar — out of scope)
- Actual backend integration (mock data only for now)
- Animations on data transition between periods (nice-to-have, not required)

## Decisions

### D1: Chart library — Recharts

**Decision:** Use Recharts.

**Rationale:** Recharts is the de-facto standard for React charting. It is React-native (renders SVG via React components), tree-shakeable, and has TypeScript types bundled. It supports `<AreaChart>` which gives us the gradient fill effect used by Yahoo Finance and Delta. Alternatives considered:

| Library | Why rejected |
|---|---|
| Chart.js + react-chartjs-2 | Canvas-based; harder to style with CSS tokens; not React-native |
| Nivo | Beautiful but large; requires more config for a simple line chart |
| Victory | Smaller community; API is more verbose for this use case |
| Visx (Airbnb) | Low-level; requires composing primitives — overkill for one chart |

### D2: Gradient area fill, not plain line

**Decision:** Use `<AreaChart>` with a `<defs><linearGradient>` fill that fades from `--accent` at full opacity to transparent.

**Rationale:** Matches the visual style of Delta/Yahoo Finance; communicates "value rising" more clearly than a plain line; the gradient is easily themed with CSS variables via SVG `fill` attributes.

### D3: Static mock data, one fixture per period

**Decision:** `StockService.getPortfolioHistory(period)` returns a hardcoded array for each period — no runtime interpolation.

**Rationale:** Consistent with the existing service-contract rule ("mock SHALL NOT derive or compute any field at runtime"). Each period gets its own pre-crafted dataset that tells a coherent story (realistic growth trajectory with a dip).

### D4: Period selector as pill group, local state

**Decision:** Period buttons are rendered as a horizontal pill group inside `PortfolioChart.tsx`. Selected period is `useState` local to the chart component — not lifted to `App`.

**Rationale:** Period selection only affects the chart; no other component needs this state. Keeping it local avoids prop-drilling and premature state architecture.

### D5: Component placement — between cards row and holdings table

**Decision:** `<PortfolioChart />` is inserted in `App.tsx` after the `.summary-cards` grid and before the `.holdings-section`.

**Rationale:** Mirrors the layout convention of Empower, Yahoo Finance, and Delta — the chart is the visual centerpiece, bridging the headline numbers above and the detail table below. No new layout regions are required.

## Risks / Trade-offs

- **[Risk] Recharts bundle size (~200 kB gzipped)** → Acceptable for an SPA of this scale. Tree-shaking is active via Vite; only imported components are bundled.
- **[Risk] Mock data doesn't reflect actual holdings** → Expected — this is a visual scaffold. When a real backend is wired, only `StockService` changes.
- **[Risk] X-axis label density on small screens** → Mitigation: configure Recharts `<XAxis interval="preserveStartEnd" />` and only show first/last tick on narrow viewports via CSS `@media`.
- **[Risk] SVG gradient fill colors don't automatically pick up CSS custom properties** → Mitigation: read the computed CSS variable value in the component using `getComputedStyle` at render time and pass it to `<linearGradient stop>` directly.

## Open Questions

- None — all decisions resolved. Ready for implementation.
