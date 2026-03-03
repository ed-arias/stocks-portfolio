## 1. State & Persistence

- [x] 1.1 Define a `ColumnId` type in `src/App.tsx` — string union of all optional column IDs: `'shares' | 'avgCost' | 'price' | 'marketValue' | 'dailyChange' | 'unrealizedGain' | 'totalReturn' | 'dividendYield'`
- [x] 1.2 Define a `COLUMN_LABELS` constant mapping each `ColumnId` to its display name (e.g., `{ shares: 'Shares', avgCost: 'Avg Cost', ... }`)
- [x] 1.3 Add a `loadColumnVisibility()` helper that reads `holdings-visible-columns` from `localStorage`, merges with an all-true default (so missing keys default to visible), and returns `Record<ColumnId, boolean>`
- [x] 1.4 Add `visibleColumns` state in `App` initialised via `loadColumnVisibility()`
- [x] 1.5 Add a `toggleColumn(id: ColumnId)` handler that flips the column's visibility and persists the updated state to `localStorage`

## 2. Column Picker UI

- [x] 2.1 Add a `pickerOpen` boolean state to `App` (controls dropdown visibility)
- [x] 2.2 Add a `useEffect` that attaches a `mousedown` listener to close the picker when clicking outside the picker container; use a `ref` on the picker wrapper div
- [x] 2.3 Add a **Columns** button to the holdings section header (right side, next to the position count) that toggles `pickerOpen`
- [x] 2.4 Render the picker dropdown (when `pickerOpen`) as a list of checkboxes, one per `ColumnId`, using `COLUMN_LABELS` for display names and `visibleColumns[id]` for checked state; each checkbox calls `toggleColumn(id)` on change

## 3. Conditional Table Rendering

- [x] 3.1 Wrap each optional `<th>` in the table header with `{visibleColumns.<id> && <th>...</th>}` for all 8 optional columns
- [x] 3.2 Wrap each corresponding optional `<td>` in every row with the same conditional, matching the column ID used in the header

## 4. Styles

- [x] 4.1 Add CSS in `src/App.css` for the Columns button (match the existing section header button style), the picker dropdown container, and the checkbox list items

## 5. Verification & Docs

- [x] 5.1 Run `npm run build` and `npm run lint` — fix any errors
- [x] 5.2 Update `CHANGELOG.md` under `## [Unreleased]` with an `Added` entry for customizable columns
- [x] 5.3 Update `BACKLOG.md` — mark item 2.8 as `✅ Done`
