## 1. Data Model

- [x] 1.1 Add `TransactionType = 'buy' | 'sell' | 'dividend' | 'split'` and `Transaction` interface to `src/types/index.ts`
- [x] 1.2 Add `transactions: Transaction[]` field to `StockPosition` interface in `src/types/index.ts`
- [x] 1.3 Add 3–5 realistic sample transactions per position in `StockService.ts` mock data (covering all four transaction types across positions)
- [x] 1.4 Update `BACKEND.md` — document `TransactionType`, `Transaction` interface, `transactions` field on `StockPosition`, and note future `GET /positions/:id/transactions` endpoint

## 2. Modal State & Behaviour

- [x] 2.1 Add `selectedPosition: StockPosition | null` state (default `null`) to `App.tsx`
- [x] 2.2 Add `useEffect` to attach Escape key listener when `selectedPosition` is non-null; clean up on close
- [x] 2.3 Wire `onClick={() => setSelectedPosition(pos)}` on each `.data-row` `<tr>` (both flat and grouped render paths)
- [x] 2.4 Add `cursor: pointer` to `.data-row` in `App.css`

## 3. Modal Component

- [x] 3.1 Run `/frontend-design` skill to design the modal — overlay, panel, header (ticker + company name + close button), transaction table with type badges, date, shares, price, amount columns
- [x] 3.2 Implement `TransactionModal` component (inline in `App.tsx` or extracted) rendering the designed markup; receives `position: StockPosition` and `onClose: () => void`
- [x] 3.3 Render `{selectedPosition && <TransactionModal position={selectedPosition} onClose={() => setSelectedPosition(null)} />}` in the App JSX
- [x] 3.4 Wire overlay `onClick` to `onClose`; stop propagation on the panel itself

## 4. Docs & Changelog

- [x] 4.1 Update `CHANGELOG.md` under `## [Unreleased]` — Added: transaction history modal per holding
