## 1. Types

- [x] 1.1 Add `AnalystRating` interface to `src/types/index.ts` with `label` union and `analystCount` fields
- [x] 1.2 Add optional `analystRating?: AnalystRating` field to `StockPosition` in `src/types/index.ts`

## 2. Mock Data

- [x] 2.1 Extend all stock and ETF mock positions in `StockService.ts` with `analystRating` covering all five rating tiers
- [x] 2.2 Leave crypto positions without `analystRating` (undefined)

## 3. UI — Badge Styles

- [x] 3.1 Run `/frontend-design` skill to define badge visual direction before writing any CSS
- [x] 3.2 Add CSS custom property tokens for each rating tier (Strong Buy, Buy, Hold, Sell, Strong Sell) in `src/index.css` for both light and dark themes
- [x] 3.3 Add `.rating-badge` base class and `.rating-strong-buy`, `.rating-buy`, `.rating-hold`, `.rating-sell`, `.rating-strong-sell` modifier classes in `src/App.css`

## 4. Holdings Table Integration

- [x] 4.1 Register "Analyst Rating" as a toggleable column in the column definitions in `App.tsx`
- [x] 4.2 Add sort comparator for the Analyst Rating column using the ordinal mapping (Strong Buy=1 … Strong Sell=5, undefined=last)
- [x] 4.3 Render the rating badge (label + analyst count) or em dash in the table cell for each row

## 5. Docs & Validation

- [x] 5.1 Update `BACKEND.md` — add `analystRating` to the `StockPosition` TypeScript types block and JSON example
- [x] 5.2 Update `CHANGELOG.md` under `## [Unreleased]` with an `Added` entry
- [x] 5.3 Run `npm run build` and `npm run lint` — fix any errors
- [x] 5.4 Mark feature 2.13 as `✅ Done` in `BACKLOG.md`
