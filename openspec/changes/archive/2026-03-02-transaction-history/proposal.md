## Why

Without transaction history, the holdings table shows where you are but not how you got there — there's no way to see individual buys, sells, dividends received, or splits for a position. Transaction history is the foundation of every serious portfolio tracker and makes the per-holding metrics (total return, avg cost) auditable.

## What Changes

- Clicking any holding row in the table opens a modal showing that position's full transaction history
- The modal lists all transactions (buy, sell, dividend, split) in reverse-chronological order with date, type badge, shares, price, and total amount
- A new `Transaction` type is added to `src/types/index.ts`
- `StockPosition` gains a `transactions: Transaction[]` field populated by the backend
- `StockService` mock data is updated with realistic sample transactions for each position
- `BACKEND.md` is updated to document the new field and endpoint
- Clicking outside the modal or pressing Escape closes it

## Capabilities

### New Capabilities
- `transaction-history-modal`: Modal triggered by clicking a holding row; displays the position's transactions in a styled table with type badges, date, shares, price, and amount columns

### Modified Capabilities
- `service-contract`: `StockPosition` gains `transactions: Transaction[]`; new `Transaction` type added to `src/types/index.ts`

## Impact

- `src/types/index.ts` — add `TransactionType` union and `Transaction` interface
- `src/services/StockService.ts` — add `transactions` arrays to each mock position
- `src/App.tsx` — add `selectedTicker` state; clicking a data row sets it; render modal when set
- `src/App.css` — modal overlay, modal container, transaction table styles
- `BACKEND.md` — document `Transaction` type, `transactions` field on `StockPosition`, note future `/positions/:id/transactions` endpoint
