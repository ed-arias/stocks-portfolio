## 1. Types & Data Model

- [x] 1.1 Add `AssetClass` union type (`'stock' | 'etf' | 'crypto' | 'cash'`) to `src/types/index.ts`
- [x] 1.2 Add `AssetAllocationBreakdown` interface (`assetClass`, `label`, `value`, `percentage`) to `src/types/index.ts`
- [x] 1.3 Add `assetClass: AssetClass` field to `StockPosition` interface
- [x] 1.4 Add `assetAllocation: AssetAllocationBreakdown[]` field to `PortfolioSummary` interface

## 2. Service Layer

- [x] 2.1 Add `assetClass` to each mock `StockPosition` entry in `StockService.ts`
- [x] 2.2 Add pre-computed `assetAllocation` array to the mock `PortfolioSummary` in `StockService.ts` (group by class, static values summing to 100%)

## 3. CSS Tokens

- [x] 3.1 Add `--asset-stock`, `--asset-etf`, `--asset-crypto`, `--asset-cash` color tokens to `:root` in `src/index.css`
- [x] 3.2 Add dark-theme overrides for the four `--asset-*` tokens under `[data-theme='dark']`

## 4. AssetAllocationChart Component

- [x] 4.1 Create `src/features/AssetAllocationChart/AssetAllocationChart.tsx` — SVG donut using `stroke-dasharray` / `stroke-dashoffset`; skip segments with `percentage === 0`
- [x] 4.2 Implement hover tooltip — absolutely positioned `<div>` overlay driven by React state `{ x, y, segment }`; show label, formatted value, and percentage
- [x] 4.3 Implement color-coded legend — one entry per non-zero segment with color swatch, label, percentage, and value read directly from props
- [x] 4.4 Ensure component performs no financial arithmetic — all values come from the `assetAllocation` prop

## 5. Dashboard Integration

- [x] 5.1 Import and render `AssetAllocationChart` in `App.tsx` between the history chart section and the holdings table
- [x] 5.2 Add allocation chart skeleton block to the loading shimmer in the correct position
- [x] 5.3 Apply card styles and horizontal padding consistent with adjacent sections

## 6. Quality

- [x] 6.1 Run `npm run build` and `npm run lint` — resolve all errors
- [x] 6.2 Update `CHANGELOG.md` under `## [Unreleased]` with the new chart feature
- [x] 6.3 Update `README.md` Backend API Contract section with the new `assetClass` field and `assetAllocation` array
