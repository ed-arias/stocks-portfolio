## 1. State & Data Layer

- [x] 1.1 Add `sortKey: ColumnKey | null` and `sortDir: 'asc' | 'desc'` state to `App.tsx`
- [x] 1.2 Implement `handleSort(key: ColumnKey)` — tri-state cycle (null→asc→desc→null, or reset to asc on key switch)
- [x] 1.3 Derive `sortedPositions` via `useMemo` using a per-column comparator (numeric subtraction for number columns, `localeCompare` for string columns)
- [x] 1.4 Update `toggleColumn` handler: when hiding a column that matches `sortKey`, reset sort state to `null`

## 2. Column Header UI

- [x] 2.1 Add `data-sort="asc|desc|none"` attribute to each `<th>` based on current `sortKey` / `sortDir`
- [x] 2.2 Wire `onClick={() => handleSort(colKey)}` on each sortable `<th>`
- [x] 2.3 Pass `sortedPositions` (instead of `positions`) to the holdings table rows

## 3. Styles

- [x] 3.1 Add CSS to `App.css`: sortable `<th>` cursor pointer + hover highlight
- [x] 3.2 Add `[data-sort="asc"]::after` and `[data-sort="desc"]::after` pseudo-element arrows (↑ / ↓) using design-system token colors

## 4. Docs & Changelog

- [x] 4.1 Update `CHANGELOG.md` under `## [Unreleased]` — Added: sortable columns in holdings table
