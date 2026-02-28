## 1. Data Layer

- [ ] 1.1 Add `totalReturn: number` and `totalReturnPercentage: number` to `PortfolioSummary` in `src/types/index.ts`
- [ ] 1.2 Compute `totalReturn` and `totalReturnPercentage` from positions in `StockService.getPortfolioSummary()`

## 2. UI

- [ ] 2.1 Add Total Return card to the cards grid in `App.tsx`
- [ ] 2.2 Display `totalReturn` as formatted currency and `totalReturnPercentage` as a pill badge
- [ ] 2.3 Apply success/danger tokens to the pill badge based on sign of `totalReturn`

## 3. Verification

- [ ] 3.1 Run `npm run build` — zero TypeScript errors
- [ ] 3.2 Run `npm run lint` — zero ESLint errors
- [ ] 3.3 Verify positive total return renders in success color
- [ ] 3.4 Verify negative total return renders in danger color
