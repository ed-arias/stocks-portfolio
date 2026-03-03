## Context

The holdings table in `App.tsx` renders `PortfolioSummary.positions` directly as an ordered list. Column headers are plain `<th>` elements with no interaction. All position data is already present client-side — sorting requires no backend changes or extra data fetching. The column-picker feature (2.8) controls which columns are visible via `visibleColumns` state; sort state must be aware of this to avoid sorting by a hidden column.

## Goals / Non-Goals

**Goals:**
- Tri-state click-to-sort on all visible columns: asc → desc → default (no sort)
- Visual sort direction indicator on the active column header
- Sort resets to default when the active sort column is hidden via the column picker

**Non-Goals:**
- Multi-column (compound) sort
- Persisting sort state to `localStorage`
- Server-side or backend-driven sort
- Stable sort tie-breaking beyond default insertion order

## Decisions

**Sort state location: `App.tsx` local state**
Sort is pure view-layer behavior — no sharing needed between components. `sortKey: ColumnKey | null` and `sortDir: 'asc' | 'desc'` live as `useState` in `App.tsx`, co-located with `visibleColumns`. Alternative (context or reducer) would be over-engineering for two fields.

**Derived sorted positions: inline `useMemo`**
`sortedPositions` is derived from `positions` via a `useMemo` that depends on `[positions, sortKey, sortDir]`. This avoids mutating original data and keeps the derivation collocated with the state it reads. Alternative (sort inside the table JSX) would re-sort on every render.

**Tri-state cycle via a single click handler**
`handleSort(key)` transitions: `null → 'asc' → 'desc' → null` (if same key), or resets to `asc` when switching keys. This is the standard spreadsheet pattern and avoids a separate "clear sort" control.

**Visual indicator: CSS `data-sort` attribute on `<th>`**
Each `<th>` receives `data-sort="asc|desc|none"`. CSS targets `[data-sort="asc"]::after` and `[data-sort="desc"]::after` to render arrow glyphs (↑ / ↓). No icon library needed. Alternative (inline SVG per header) adds DOM weight for minimal visual gain.

**Sort comparator: per-column numeric vs. string**
Numeric columns (`shares`, `avgCost`, `currentPrice`, `marketValue`, `unrealizedGain`, `unrealizedGainPercentage`, `dailyChange`, `dailyChangePercentage`) use numeric subtraction. String columns (`ticker`, `companyName`) use `localeCompare`. Direction is applied by multiplying by `1` or `-1`.

**Reset sort on column hide**
In the `toggleColumn` handler (or equivalent in `App.tsx`), when a column is toggled off and it matches `sortKey`, reset `sortKey` to `null`. This prevents a confusing invisible-sort state.

## Risks / Trade-offs

- **Locale-sensitivity of string sort** → `localeCompare` with default locale is sufficient for tickers and company names; no mitigation needed.
- **Position of `sortedPositions` derivation** → Must remain downstream of the `positions` data load; if data loading becomes async/paginated in future, sort will need to move server-side. Acceptable for current mock-data scope.
- **`useMemo` dependency on `positions` reference** → `StockService` returns a new array each call; ensure `positions` state is stable between renders to avoid unnecessary re-sorts. Already satisfied since positions are set once on mount.
