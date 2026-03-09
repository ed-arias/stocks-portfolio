## Context

The app previously used a sidebar (240px) + scrollable main column layout. The sidebar held only the logotype and theme toggle — providing no navigational value but permanently consuming 18–22% of horizontal viewport width. The main column stacked sections vertically: page title → summary cards → portfolio chart → allocation explorer → holdings table. On a typical 1440px display, users had to scroll ≈1000px to reach the holdings table — the most frequently accessed section.

The redesign, already implemented, replaces this with three horizontal zones:
1. A 56px sticky **top bar** (always visible)
2. A **two-column dashboard grid** (chart + right rail)
3. A **full-width holdings table** immediately below

## Goals / Non-Goals

**Goals:**
- Holdings table reachable in ≤ 1 scroll on any ≥ 900px viewport
- Portfolio total value always visible regardless of scroll position
- Horizontal screen real estate used up to 1400px
- All existing features preserved with no regressions
- Responsive cascade covering 1400px → 375px

**Non-Goals:**
- Navigation between multiple pages or views (no router changes)
- New data displayed (no service or type changes)
- Redesigning individual components (PortfolioChart, AllocationExplorer, table cells are untouched)
- Dark/light theme token changes

## Decisions

### D1: Top bar replaces sidebar (not augmented)

**Decision**: Remove sidebar entirely; put logotype, hero metric, and theme toggle in a 56px top bar.

**Rationale**: The sidebar's only content was a logotype (branding) and a theme toggle (utility). Both fit comfortably in a top bar. Adding navigation items to the sidebar was considered but rejected — the app currently has one view, so a navigation sidebar would be premature.

**Alternative considered**: Keep sidebar but add navigation items → rejected; over-engineering for a single-view app.

### D2: Two-column grid with fixed right rail (300px)

**Decision**: `grid-template-columns: 1fr 300px` — chart takes all remaining space; right rail is fixed at 300px.

**Rationale**: The AllocationExplorer's donut SVG is 220px wide. With 1.5rem padding on each side (24px), the minimum right rail width that prevents overflow is ≈268px. 300px gives comfortable breathing room (content area 252px, SVG 220px → 16px each side). A proportional column (e.g., `3fr 1fr`) was considered but would shrink the rail too aggressively at smaller desktop widths.

**Alternative considered**: `3fr 1fr` proportional → right rail becomes too narrow at 900–1100px viewports.

### D3: Collapse to single column at 900px (not 768px)

**Decision**: Single-column breakpoint at `max-width: 899px`.

**Rationale**: At 900px with 2 × 2.5rem padding (80px), available content width is 820px. After allocating 300px for the right rail and 24px for the gap, the chart column receives 496px — acceptable for a line chart. At 768px the chart column would shrink to 364px, which is too narrow. The existing app already used 900px as its mobile breakpoint, so this is consistent.

### D4: Two delta text variants for top bar (not a single responsive string)

**Decision**: Two `<span>` siblings inside the delta badge — `.hero-delta-full` (full text including dollar amount and "today" suffix) and `.hero-delta-short` (percentage only) — toggled via CSS `display` at the 767px breakpoint.

**Rationale**: Attempting to fit the full delta string `▲ +$1,204 (0.97%) today` on a 375px mobile screen alongside the portfolio value and theme toggle is not feasible. Truncating with `text-overflow` would be confusing. The two-span approach keeps markup semantically complete and the switch purely presentational.

## Risks / Trade-offs

- **AllocationExplorer legend overflow at 300px rail** → The donut legend wraps item text at narrow widths; items with long company names (e.g., `NVDA · NVIDIA Corporation`) may truncate. Mitigation: legend text is already `0.7rem`; acceptable at this width. A future task could add `text-overflow: ellipsis` to legend labels.
- **PortfolioChart ResponsiveContainer at narrow windows** → Below 400px the chart column may compress unpleasantly; the `overflow-x: auto` on the table-scroll wrapper handles the table, but the chart has no horizontal scroll. Mitigation: the chart is behind a `<div className="chart-panel">` with `min-width: 0`; Recharts ResponsiveContainer handles graceful degradation.
- **Max-width 1400px may not center visually on ultra-wide monitors** → At ≥ 2560px the content area is still left-heavy before the `margin: 0 auto` kicks in. Acceptable for a personal tracker; not a concern.

## Migration Plan

The layout change is already implemented. This document records the decisions made. No migration steps are required — no API changes, no data schema changes, no localStorage key changes. Rollback: revert `App.tsx` and `App.css` to the previous commit.
