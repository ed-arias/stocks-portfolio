## Why

The holdings table shows financial metrics but no signal on market sentiment. Adding analyst consensus ratings gives users a quick, at-a-glance view of professional opinion on each position — helping them contextualize performance and make more informed decisions without leaving the portfolio view.

## What Changes

- Add an `analystRating` field to `StockPosition` with a rating label and analyst count
- Add "Analyst Rating" as a toggleable, sortable column in the holdings table
- Render a color-coded badge (Strong Buy / Buy / Hold / Sell / Strong Sell) per holding
- Populate with mock data in `StockService`

## Capabilities

### New Capabilities

- `analyst-consensus-rating-column`: Displays analyst consensus rating as a color-coded badge in the holdings table, toggleable via the column picker and sortable

### Modified Capabilities

- `holdings-table-columns`: The column picker gains a new "Analyst Rating" entry; the sortable columns system gains a new sortable field
- `service-contract`: `StockPosition` gains an `analystRating` field; `StockService` mock data is extended

## Impact

- `src/types/index.ts` — new `AnalystRating` type + field on `StockPosition`
- `src/services/StockService.ts` — mock data extended with `analystRating` per position
- `src/App.tsx` — new column definition registered in the column picker and table renderer
- `src/index.css` / `src/App.css` — badge styles for each rating tier
- `BACKEND.md` — `StockPosition` type block and JSON example updated
