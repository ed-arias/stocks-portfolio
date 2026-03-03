## Context

The holdings table currently renders positions as a single flat list. All position data is available client-side; `assetClass` (`'stock' | 'etf' | 'crypto' | 'cash'`) is already on every `StockPosition`. The column-picker (2.8) and sortable-columns (2.9) features manage their own state in `App.tsx`; grouping state follows the same pattern.

## Goals / Non-Goals

**Goals:**
- Group holdings table rows under collapsible asset-class headers with group subtotals
- "Group by" toggle in the section header switches between grouped and flat view
- Sort (2.9) continues to work within each group when grouping is active
- Hiding the active sort column via the column picker still resets sort (existing behaviour preserved)

**Non-Goals:**
- Grouping by sector or country (out of scope for this change)
- Persisting group expand/collapse state to `localStorage`
- Nested grouping (groups within groups)
- Drag-and-drop reordering of groups

## Decisions

**Group state: two `useState` fields in `App.tsx`**
`groupBy: 'assetClass' | null` controls whether grouping is active. `collapsedGroups: Set<string>` tracks which group keys are collapsed. Both live in `App.tsx` alongside `sortKey`/`sortDir` and `visibleColumns`. No new context or reducer needed.

**Derived grouped structure: `useMemo`**
`groupedPositions` is derived from `sortedPositions` (already memoized in 2.9). When `groupBy === 'assetClass'`, positions are bucketed into an ordered `Map<string, StockPosition[]>` keyed by `assetClass`. Group order follows a fixed display order: Stocks → ETFs → Crypto → Cash → Other. When `groupBy === null`, renders the existing flat list unchanged.

**Group subtotals: derived inline alongside bucketing**
Each group accumulates `totalValue` (sum of `marketValue`) and `dailyChange` (sum of `dailyChange`) while bucketing. No separate pass needed. These are displayed in the group header row.

**Rendering: group header rows interleaved in `<tbody>`**
Group headers are rendered as `<tr className="group-header-row">` inside the existing `<tbody>`, spanning all visible columns via `colSpan`. This avoids multiple `<tbody>` elements (which complicate border-collapse) and keeps the table semantically valid. Alternative (separate `<tbody>` per group) adds complexity with no meaningful benefit.

**Toggle UI: pill button in section header alongside "Columns" picker**
A "Group" pill button mirrors the existing "Columns" button style — same border-radius, same size, accent when active. Placed to the left of the "Columns" picker. Clicking toggles `groupBy` between `'assetClass'` and `null`.

**Expand/collapse: chevron in group header row**
Clicking anywhere on the group header row toggles that group's collapsed state. A CSS-rotated chevron (`›` rotated 90°) indicates expanded/collapsed. Collapsed groups hide their `<tr>` rows via `display: none` (toggled by a CSS class on the group header, targeting sibling rows via JS — or via conditional rendering). Conditional rendering is simpler and more React-idiomatic; use that.

**Sort interaction: sort applies within groups**
`sortedPositions` is already derived before grouping. Bucketing into groups preserves per-group sort order since it slices from the already-sorted array. No additional sort logic needed.

## Risks / Trade-offs

- **`colSpan` must match visible column count** → Derive `visibleColCount` from `visibleColumns` + 1 (always-visible Ticker). Must stay in sync when columns are toggled; compute it from the same `visibleColumns` state rather than hardcoding.
- **Group header rows and `holdings-table tbody tr:hover`** → Group header rows must be excluded from the row hover style. Use a more specific selector or a `.data-row` class on data rows.
- **Animation stagger on tbody rows** → Existing nth-child animation delays target row indices in the flat list; with groups interleaved, delays may look odd. Accept as a known limitation; stagger can be revisited when row animation is refactored.
