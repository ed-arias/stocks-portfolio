## Why

The holdings table shows unrealized capital gain/loss per position but ignores dividend income received — understating true performance for income-producing holdings. Backlog item 2.7 closes this gap by surfacing a total return figure (capital gains + dividends) per position.

## What Changes

- Add `totalReturn: number` and `totalReturnPercentage: number` to `StockPosition` — pre-computed by the backend to include both capital gains and all dividends received
- Add a **Total Return** column to the holdings table displaying absolute value and percentage, color-coded positive/negative, using the same stacked `.pl-cell` layout as Profit/Loss and Daily Change

## Capabilities

### New Capabilities

- `holding-total-return-column`: Per-holding total return column in the holdings table — renders `totalReturn` (currency) and `totalReturnPercentage` (%) stacked, color-coded green/red

### Modified Capabilities

- `service-contract`: `StockPosition` gains two new required fields: `totalReturn: number` and `totalReturnPercentage: number`

## Impact

- `src/types/index.ts` — add `totalReturn: number` and `totalReturnPercentage: number` to `StockPosition`
- `src/services/StockService.ts` — add both fields to each mock position fixture (totalReturn = unrealizedGain + dividends received)
- `src/App.tsx` — add Total Return column to the holdings table
- `openspec/specs/service-contract/spec.md` — new requirement for the two fields
