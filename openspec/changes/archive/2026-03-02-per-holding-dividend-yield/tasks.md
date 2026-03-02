## 1. Type & Service Layer

- [x] 1.1 Add `dividendYield: number` to the `StockPosition` interface in `src/types/index.ts`
- [x] 1.2 Add a `dividendYield` value to every position fixture in `src/services/StockService.ts` (realistic yield for dividend payers, `0` for crypto/non-payers)

## 2. Holdings Table UI

- [x] 2.1 Add a **Div. Yield** `<th>` column header to the holdings table in `src/App.tsx`
- [x] 2.2 Add a `<td>` cell per row that renders `dividendYield > 0 ? formatPercentage(dividendYield) : '—'`

## 3. Formatting Utility

- [x] 3.1 Confirm or add a `formatPercentage(value: number, decimals?: number): string` helper in `src/utils/formatters.ts` (or wherever `formatCurrency` lives) — if it already exists, use it; do not duplicate

## 4. Verification & Docs

- [x] 4.1 Run `npm run build` and `npm run lint` — fix any errors
- [x] 4.2 Update `CHANGELOG.md` under `## [Unreleased]` with an `Added` entry for the Div. Yield column
