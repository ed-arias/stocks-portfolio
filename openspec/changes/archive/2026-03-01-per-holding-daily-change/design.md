## Context

The holdings table in `App.tsx` currently renders six columns: Ticker, Shares, Avg Cost, Price, Total Value, Profit / Loss. The `dailyChange` and `dailyChangePercentage` fields are already present on every `StockPosition` returned by `StockService`. No service, type, or CSS changes are needed — this is a single-file UI addition.

## Goals / Non-Goals

**Goals:**
- Add a Daily Change column to the holdings table showing absolute change (currency) and percentage stacked vertically, color-coded with success/danger tokens
- Match the existing Profit / Loss column layout exactly (`.pl-cell` + `.pl-pct` pattern)

**Non-Goals:**
- No sorting, filtering, or interaction on the new column
- No new CSS classes — reuse `.pl-cell`, `.pl-pct`, `.positive`, `.negative` from `App.css`
- No changes to `StockService`, `types/index.ts`, or any component other than `App.tsx`

## Decisions

### Reuse `.pl-cell` / `.pl-pct` layout for the new column

The Profit / Loss column already uses `.pl-cell` (flex column, align-items: flex-end) and `.pl-pct` (smaller muted percentage beneath). Daily Change has an identical visual structure — absolute value on top, percentage below. Reusing the same classes keeps the columns visually consistent with zero new CSS.

### Column position: after Profit / Loss

Daily Change goes after Profit / Loss as the rightmost column. Profit / Loss (all-time) is more fundamental; Daily Change is a shorter-term contextual metric. Right-to-left reading order: most stable → most volatile.

**Alternative considered**: Place Daily Change before Profit / Loss (today first). Rejected — all-time P&L is the primary metric; daily is supplementary context.

### Header label: "Daily Change"

Matches the backlog feature name and is unambiguous. Short enough to avoid header wrapping at typical table widths.

## Risks / Trade-offs

- **Table width on mobile**: Adding a seventh column increases horizontal scroll on narrow screens. → Mitigation: `.table-scroll` already enables `overflow-x: auto`; no layout changes needed. The existing `white-space: nowrap` on cells ensures correct rendering.
- **Zero daily change**: When `dailyChange === 0`, the cell should render as neither positive nor negative. → Use the same condition as the existing Profit / Loss column: `dailyChange >= 0` maps to `.positive`, `< 0` to `.negative`. Zero renders green (neutral-positive), consistent with the rest of the UI.
