## 1. Holdings Table — Daily Change Column

- [x] 1.1 Add "Daily Change" `<th>` header to the holdings table in `App.tsx`
- [x] 1.2 Add daily change `<td>` to each position row using the `.pl-cell` / `.pl-pct` pattern, rendering `dailyChange` (currency) and `dailyChangePercentage` (%) stacked, color-coded with `pos.dailyChange >= 0 ? 'positive' : 'negative'`

## 2. Docs & Verification

- [x] 2.1 Update `CHANGELOG.md` under `## [Unreleased]` with Added entry for per-holding daily change column
- [x] 2.2 Mark `2.3 | Per-holding daily change | ✅ Done` in `BACKLOG.md`
- [x] 2.3 Run `npm run build` and confirm zero TypeScript errors
- [x] 2.4 Run `npm run lint` and confirm zero ESLint errors
