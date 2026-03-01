## 1. Types

- [x] 1.1 Remove `AssetAllocationBreakdown` interface from `src/types/index.ts`
- [x] 1.2 Remove `portfolioWeight` field from `StockPosition` in `src/types/index.ts`
- [x] 1.3 Add `AllocationBreakdown` interface (`key`, `value`, `percentage`, `assetClass?`) to `src/types/index.ts`
- [x] 1.4 Replace `assetAllocation: AssetAllocationBreakdown[]` with `allocations: { byAssetClass: AllocationBreakdown[]; byHolding: AllocationBreakdown[] }` on `PortfolioSummary`

## 2. Mock Data

- [x] 2.1 Remove `portfolioWeight` from all 6 mock `StockPosition` entries in `StockService.ts`
- [x] 2.2 Replace `assetAllocation` with `allocations.byAssetClass` (same 3 entries, rename `assetClass` key → `key`) in `MOCK_SUMMARY`
- [x] 2.3 Add `allocations.byHolding` (one entry per position: `key: ticker`, `value: marketValue`, `percentage: old portfolioWeight`, `assetClass: position's assetClass`) to `MOCK_SUMMARY`

## 3. Generic AllocationChart Component

- [x] 3.1 Delete `src/features/AssetAllocationChart/AssetAllocationChart.tsx`
- [x] 3.2 Create `src/features/AllocationChart/AllocationChart.tsx` using `/frontend-design` skill — props: `data: AllocationBreakdown[]`, `title: string`, `colorFn`, `labelFn`; keep SVG donut geometry, mount animation, tooltip, and legend

## 4. App Integration

- [x] 4.1 Replace `AssetAllocationChart` import with `AllocationChart` in `App.tsx`
- [x] 4.2 Add `ASSET_CLASS_LABELS` module-scope const in `App.tsx`
- [x] 4.3 Render asset allocation `AllocationChart` with `colorFn`/`labelFn` using `allocations.byAssetClass`
- [x] 4.4 Render holdings weight `AllocationChart` with ticker+company `labelFn` and asset-class `colorFn` using `allocations.byHolding`
- [x] 4.5 Add second allocation skeleton block to loading shimmer in `App.tsx`

## 5. Styles

- [x] 5.1 Add `.skeleton-alloc-holdings { height: 260px; border-radius: 16px; }` to `App.css`

## 6. Docs & Backlog

- [x] 6.1 Update `README.md` Backend API Contract — remove `portfolioWeight` from `StockPosition`, replace `assetAllocation` with `allocations` object, update TypeScript type definitions
- [x] 6.2 Add `1.12 | Holdings weight donut chart (per-position allocation %) | ✅ Done` to `BACKLOG.md`
- [x] 6.3 Remove feature `2.4 | Per-holding portfolio weight (%)` from `BACKLOG.md` (superseded by 1.12)
- [x] 6.4 Update `CHANGELOG.md` under `## [Unreleased]` — document generalized allocation system, holdings weight chart, and removal of 2.4

## 7. Verification

- [x] 7.1 `npm run build` passes with zero TypeScript errors
- [x] 7.2 `npm run lint` passes with zero ESLint errors
- [x] 7.3 Both donut charts render on the dashboard — asset allocation above, holdings weight below
- [x] 7.4 Hovering a holdings segment shows ticker, company name, value, and weight %
- [x] 7.5 Holdings chart segment colors match each position's asset class
- [x] 7.6 Loading skeleton shows two allocation placeholder blocks
