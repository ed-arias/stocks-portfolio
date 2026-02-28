## 1. Types

- [x] 1.1 Add `marketValue`, `unrealizedGain`, `unrealizedGainPercentage`, `dailyChange`, `dailyChangePercentage`, `portfolioWeight` to `StockPosition` in `src/types/index.ts`
- [x] 1.2 Add `totalReturn` and `totalReturnPercentage` to `PortfolioSummary` in `src/types/index.ts`

## 2. Mock Service

- [x] 2.1 Replace dynamic `totalValue` computation in `StockService` with a static literal value
- [x] 2.2 Add static pre-computed values for all new `StockPosition` fields to each mock position
- [x] 2.3 Add static `totalReturn` and `totalReturnPercentage` values to the mock `PortfolioSummary` response
- [x] 2.4 Remove all runtime arithmetic from `StockService`

## 3. Frontend

- [x] 3.1 Remove inline `totalValue`, `pl`, and `plPct` calculations from `App.tsx`
- [x] 3.2 Replace calculated references with direct reads of `pos.marketValue`, `pos.unrealizedGain`, `pos.unrealizedGainPercentage`

## 4. API Documentation

- [x] 4.1 Update `README.md` `GET /portfolio/summary` response example to include all new fields
- [x] 4.2 Update `PortfolioSummary` TypeScript interface in `README.md` with `totalReturn` and `totalReturnPercentage`
- [x] 4.3 Update `StockPosition` TypeScript interface in `README.md` with all six new pre-computed fields

## 5. Verification

- [x] 5.1 Run `npm run build` — zero TypeScript errors
- [x] 5.2 Run `npm run lint` — zero ESLint errors
- [x] 5.3 Confirm no arithmetic operators (`*`, `/`, `-`) remain inside `App.tsx` render logic
