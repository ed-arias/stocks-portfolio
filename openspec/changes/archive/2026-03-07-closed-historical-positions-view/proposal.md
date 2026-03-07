## Why

Users who have exited positions have no way to review their historical trades — realized gains/losses, hold periods, and exit prices are invisible once shares reach zero. Adding a closed positions view completes the portfolio narrative and makes the app useful for post-trade review and tax planning.

## What Changes

- Add a `ClosedPosition` type representing a fully-exited holding (ticker, company name, asset class, shares, avg cost, exit price, realized gain/loss absolute + %, open date, close date, hold period in days).
- Extend `StockService` with a `getClosedPositions()` method returning mock `ClosedPosition[]` data.
- Add a "Closed Positions" tab (or collapsible section) below the active holdings table, showing all exited holdings in a styled table.
- Columns: Ticker, Company, Asset Class, Shares, Avg Cost, Exit Price, Realized Gain/Loss (absolute), Realized Gain/Loss (%), Hold Period.
- Table is sortable by any column; rows are grouped by asset class (matching the active holdings pattern).

## Capabilities

### New Capabilities

- `closed-positions-table`: Read-only table of fully-exited holdings with realized P&L, hold period, and asset-class grouping. Displayed in the Holdings section below active positions.

### Modified Capabilities

- `service-contract`: New `ClosedPosition` type and `getClosedPositions()` method added to the service layer.

## Impact

- **New type**: `ClosedPosition` in `src/types/index.ts`
- **Service**: `StockService.getClosedPositions()` in `src/services/StockService.ts`
- **New component**: `src/features/ClosedPositionsTable/` (table + grouping logic)
- **App.tsx**: Load closed positions on mount; render new section beneath Holdings table
- **Styles**: Extend `src/App.css` / `src/index.css` with closed-positions table tokens
- **Docs**: `BACKEND.md` (new type + endpoint), `CHANGELOG.md`, `BACKLOG.md`, `README.md`
