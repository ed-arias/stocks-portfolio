## 1. Types & Service

- [x] 1.1 Add `ClosedPosition` interface to `src/types/index.ts` with all required fields
- [x] 1.2 Add `getClosedPositions(): Promise<ClosedPosition[]>` method to `StockService.ts` with at least 3 static mock fixtures spanning 2+ asset classes (mix of gains and losses)

## 2. ClosedPositionsTable Component

- [x] 2.1 Create `src/features/ClosedPositionsTable/ClosedPositionsTable.tsx` with props: `positions: ClosedPosition[]`
- [x] 2.2 Implement asset-class grouping with collapsible group rows (defaulting to expanded), matching the active holdings table pattern
- [x] 2.3 Render group subtotal row showing sum of `realizedGain` in the Realized G/L ($) column; leave Realized G/L (%) blank
- [x] 2.4 Implement sortable column headers for all 9 columns; default sort = closeDate descending
- [x] 2.5 Format hold period: `holdDays < 30` → `"<N>d"`, `30–364` → `"<N>mo"`, `≥ 365` → `"<Y>y <M>mo"` (omit months if zero)
- [x] 2.6 Apply success/danger color tokens to Realized G/L cells (positive = green, negative = red)

## 3. Holdings Section Integration

- [x] 3.1 Load closed positions in `App.tsx` on mount via `StockService.getClosedPositions()`; store in state
- [x] 3.2 Render a collapsible "Closed Positions" section below the active holdings table; default to collapsed
- [x] 3.3 Pass closed positions state to `<ClosedPositionsTable>`

## 4. Styles

- [x] 4.1 Use `/frontend-design` skill to design the closed positions section (section header toggle, table styles, group rows, subtotal rows)
- [x] 4.2 Add CSS to `src/App.css` / `src/index.css` per the design output, using existing design token conventions

## 5. Docs & Backlog

- [x] 5.1 Update `BACKEND.md`: add `ClosedPosition` type block, JSON example, and `getClosedPositions` endpoint entry
- [x] 5.2 Update `CHANGELOG.md` under `## [Unreleased]` with an `Added` entry for feature 2.12
- [x] 5.3 Mark feature 2.12 `✅ Done` in `BACKLOG.md`
- [x] 5.4 Update `README.md` with the new closed positions capability

## 6. Quality

- [x] 6.1 Run `npm run build` — zero TypeScript errors
- [x] 6.2 Run `npm run lint` — zero lint errors
