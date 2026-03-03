## 1. Type & Service Layer

- [x] 1.1 Add `totalReturn: number` and `totalReturnPercentage: number` to the `StockPosition` interface in `src/types/index.ts`
- [x] 1.2 Add `totalReturn` and `totalReturnPercentage` to every position fixture in `src/services/StockService.ts` (totalReturn = unrealizedGain + dividends received to date; 0% dividend yield positions have totalReturn === unrealizedGain)

## 2. Holdings Table UI

- [x] 2.1 Add a **Total Return** `<th>` column header to the holdings table in `src/App.tsx`, placed after "Profit / Loss"
- [x] 2.2 Add a `<td>` cell per row using the `.pl-cell` / `.pl-pct` stacked layout, color-coded by `totalReturn >= 0`, displaying `formatCurrency(pos.totalReturn)` and `pos.totalReturnPercentage.toFixed(2)%`

## 3. Verification & Docs

- [x] 3.1 Run `npm run build` and `npm run lint` — fix any errors
- [x] 3.2 Update `CHANGELOG.md` under `## [Unreleased]` with an `Added` entry for the Total Return column
- [x] 3.3 Update `BACKLOG.md` — mark item 2.7 as `✅ Done`
