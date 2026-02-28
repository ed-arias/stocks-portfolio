## Why

The dashboard currently shows only daily gain/loss, giving no sense of overall portfolio performance. Users need an all-time total return card to understand how their portfolio has grown since inception.

## What Changes

- Add `totalReturn` and `totalReturnPercentage` fields to the `PortfolioSummary` type and `StockService` mock
- Add a third summary card to the dashboard displaying all-time total return (absolute $ and %)
- Card follows the same iOS-style pill badge pattern as the day gain/loss card

## Capabilities

### New Capabilities
- `total-return-card`: A summary card showing all-time portfolio return in absolute USD and percentage, color-coded with success/danger tokens

### Modified Capabilities
- `dashboard-ui`: New card added to the cards grid (layout requirement change)

## Impact

- `src/types/index.ts` — add `totalReturn` and `totalReturnPercentage` to `PortfolioSummary`
- `src/services/StockService.ts` — compute and return `totalReturn` and `totalReturnPercentage` from mock positions
- `src/App.tsx` — render the new card in the cards grid
- `openspec/specs/dashboard-ui/spec.md` — delta to reflect the third card requirement
