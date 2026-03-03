## Why

The holdings table currently has no column sorting, making it difficult to quickly identify best/worst performers, largest positions, or other ranked views. Sortable columns is a foundational table usability feature that users expect from any financial dashboard.

## What Changes

- Column headers in the holdings table become clickable sort triggers
- Clicking a column header sorts the table by that column (ascending); clicking again toggles to descending; a third click resets to default order
- A visual sort indicator (arrow icon) appears on the active sort column showing direction
- Sort state is local to the session (not persisted)
- All visible columns are sortable: Ticker, Company, Shares, Avg Cost, Current Price, Market Value, Daily Change, Unrealized Gain, Total Return, Weight (when visible)

## Capabilities

### New Capabilities
- `sortable-columns`: Click-to-sort on holdings table columns with directional indicator and tri-state cycle (asc → desc → default)

### Modified Capabilities
- `column-picker`: Column visibility interacts with sort state — hiding the active sort column resets sort to default

## Impact

- `src/App.tsx` — add sort state (`sortKey`, `sortDir`) and sorted-positions derivation; pass sort props to holdings table
- `src/App.css` — sort indicator styles (arrow icon, active header highlight)
- No backend changes — sorting is client-side only (all data already present)
- No changes to `StockService.ts` or data types
