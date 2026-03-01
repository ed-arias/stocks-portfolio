## Why

Feature 1.5 hardcoded a per-asset-class donut chart and a one-off `AssetAllocationBreakdown` type. Adding a per-holding donut (feature 1.12) would require duplicating that component. This change generalizes the allocation architecture so any dimension of breakdown (by asset class, by holding, or future dimensions like sector) is served by one generic `AllocationChart` component driven by a unified `AllocationBreakdown` type.

## What Changes

- **BREAKING** Remove `AssetAllocationBreakdown` interface from `src/types/index.ts`; replace with generic `AllocationBreakdown` (uses `key: string` instead of `assetClass: AssetClass`)
- **BREAKING** Remove `portfolioWeight` from `StockPosition`; weight data now lives in `allocations.byHolding`
- **BREAKING** Replace `assetAllocation: AssetAllocationBreakdown[]` on `PortfolioSummary` with `allocations: { byAssetClass: AllocationBreakdown[]; byHolding: AllocationBreakdown[] }`
- Rename/replace `AssetAllocationChart` component with generic `AllocationChart` accepting `data`, `title`, `colorFn`, and `labelFn` props
- Render two `AllocationChart` instances in `App.tsx`: asset class breakdown + new holdings weight breakdown
- Add loading skeleton for the second allocation block in `App.css`
- Remove feature 2.4 (per-holding weight column) from backlog — superseded by holdings chart

## Capabilities

### New Capabilities
- `allocation-chart`: Generic donut chart component that renders any `AllocationBreakdown[]` dataset with caller-supplied color and label functions
- `holdings-weight-chart`: Per-holding allocation chart showing each position's weight in the portfolio

### Modified Capabilities
- `asset-allocation-chart`: Component is replaced by the generic `AllocationChart`; `AssetAllocationBreakdown` type is removed; `assetAllocation` field replaced by `allocations` object on `PortfolioSummary`
- `service-contract`: `portfolioWeight` removed from `StockPosition`; `assetAllocation` replaced by `allocations.byAssetClass` + `allocations.byHolding` on `PortfolioSummary`

## Impact

- `src/types/index.ts` — breaking type changes
- `src/services/StockService.ts` — updated mock data shape
- `src/features/AssetAllocationChart/AssetAllocationChart.tsx` — deleted
- `src/features/AllocationChart/AllocationChart.tsx` — new generic component
- `src/App.tsx` — updated imports, two chart renders, new loading skeleton
- `src/App.css` — new skeleton style
- `README.md` — backend API contract updated
- `BACKLOG.md` — 1.12 added ✅, 2.4 removed
- `CHANGELOG.md` — new entries
