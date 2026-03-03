## 1. State & Derived Data

- [x] 1.1 Add `groupBy: 'assetClass' | null` state (default `null`) to `App.tsx`
- [x] 1.2 Add `collapsedGroups: Set<string>` state (default empty) to `App.tsx`
- [x] 1.3 Add `toggleGroupCollapse(key: string)` handler that adds/removes from `collapsedGroups`
- [x] 1.4 Derive `groupedPositions: Map<string, StockPosition[]>` via `useMemo` from `sortedPositions` — bucket by `assetClass` in fixed display order (stock → etf → crypto → cash); compute `totalValue` and `dailyChange` subtotals per group

## 2. Toggle UI

- [x] 2.1 Add a "Group" pill button to the section header (left of the "Columns" picker), styled to match the existing `col-picker-btn` — accent when `groupBy` is active
- [x] 2.2 Wire button `onClick` to toggle `groupBy` between `'assetClass'` and `null`; reset `collapsedGroups` to empty when deactivating grouping

## 3. Table Rendering

- [x] 3.1 In the table `<tbody>`, conditionally render grouped or flat rows based on `groupBy`
- [x] 3.2 For each group: render a `<tr className="group-header-row">` with a single `<td colSpan={visibleColCount}>` containing: chevron icon, asset class label, position count badge, total value, and daily change (colour-coded)
- [x] 3.3 Derive `visibleColCount` from `visibleColumns` + 1 (Ticker is always visible) so `colSpan` stays accurate when columns are toggled
- [x] 3.4 Render group position rows only when the group is not in `collapsedGroups`; add a `.data-row` class to all data `<tr>` elements
- [x] 3.5 Wire group header row `onClick` to `toggleGroupCollapse(group.key)`

## 4. Styles

- [x] 4.1 Run `/frontend-design` skill to design group header row styles: background, typography, chevron indicator, subtotal layout, hover state

## 5. Docs & Changelog

- [x] 5.1 Update `CHANGELOG.md` under `## [Unreleased]` — Added: asset-class grouping for holdings table
