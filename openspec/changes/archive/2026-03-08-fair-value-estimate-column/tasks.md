## 1. Types

- [x] 1.1 Add `FairValueEstimate` interface to `src/types/index.ts` with `price` and `source` fields
- [x] 1.2 Add optional `fairValue?: FairValueEstimate` field to `StockPosition` in `src/types/index.ts`

## 2. Mock Data

- [x] 2.1 Extend all stock and ETF mock positions in `StockService.ts` with `fairValue` covering all three valuation tiers (Undervalued, Fair, Overvalued)
- [x] 2.2 Leave crypto positions without `fairValue` (undefined)

## 3. UI — Badge Styles

- [x] 3.1 Run `/frontend-design` skill to define fair value badge visual direction before writing any CSS
- [x] 3.2 Add CSS custom property tokens for each valuation tier (Undervalued, Fair, Overvalued) in `src/index.css` for both light and dark themes
- [x] 3.3 Add `.fv-badge` base class and `.fv-undervalued`, `.fv-fair`, `.fv-overvalued` modifier classes in `src/App.css`

## 4. Holdings Table Integration

- [x] 4.1 Register "Fair Value" as a toggleable column in the column definitions in `App.tsx`
- [x] 4.2 Add sort comparator for the Fair Value column sorting by upside % (positions without fair value sort last)
- [x] 4.3 Add `fairValueUpside` helper to compute `((fairValue.price - currentPrice) / currentPrice) * 100`
- [x] 4.4 Render the fair value cell: price + upside % + valuation badge (or em dash) in both flat and grouped table views

## 5. Docs & Validation

- [x] 5.1 Update `BACKEND.md` — add `fairValue` to the `StockPosition` TypeScript types block and JSON example
- [x] 5.2 Update `CHANGELOG.md` under `## [Unreleased]` with an `Added` entry
- [x] 5.3 Run `npm run build` and `npm run lint` — fix any errors
- [x] 5.4 Mark feature 2.14 as `✅ Done` in `BACKLOG.md`
