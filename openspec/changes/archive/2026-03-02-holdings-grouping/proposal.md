## Why

A flat holdings list becomes hard to scan as the number of positions grows. Grouping rows by asset class (Stocks, ETFs, Crypto, Cash) makes the portfolio structure immediately legible — users can see how each asset class contributes at a glance, and collapse classes they're not focused on.

## What Changes

- Holdings table renders rows grouped under collapsible asset-class section headers
- Each group header shows: asset class label, position count, group total value, and group daily change
- Groups can be expanded or collapsed independently; all groups start expanded
- A "Group by" toggle switches between grouped and flat (ungrouped) view
- Flat view preserves existing behaviour (default for familiarity)
- Sort state works within each group independently when grouping is active

## Capabilities

### New Capabilities
- `holdings-grouping`: Collapsible asset-class groups in the holdings table with group subtotals and expand/collapse controls, plus a "Group by" toggle to switch between grouped and flat views

### Modified Capabilities
- `sortable-columns`: Sort behaviour when grouping is active — sort applies within each group, not across the full table

## Impact

- `src/App.tsx` — group state (`groupBy: 'assetClass' | null`), expand/collapse state per group, grouped row derivation; "Group by" toggle button in section header
- `src/App.css` — group header row styles, expand/collapse chevron, group subtotal layout
- No changes to `StockService.ts`, data types, or `BACKEND.md` — `assetClass` is already on `StockPosition`
