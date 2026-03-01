# asset-allocation-chart Specification

## Purpose
Dashboard section that renders an `AllocationChart` instance showing portfolio breakdown by asset class (Stocks, ETFs, Crypto, Cash). Uses the generic `AllocationChart` component with an algorithmic pastel color function and a module-scope `ASSET_CLASS_LABELS` map. No financial arithmetic in the component.

## Requirements

### Requirement: Asset allocation chart uses AllocationChart with algorithmic colorFn and labelFn
The dashboard SHALL render `<AllocationChart data={portfolio.allocations.byAssetClass} title="Asset Allocation" colorFn={...} labelFn={...} />`. The `colorFn` SHALL use `holdingColor(idx, total)` to assign a unique pastel hue to each asset class by its index in `byAssetClass`. The `labelFn` SHALL map `key` strings to human-readable labels via a module-scope `ASSET_CLASS_LABELS` constant in `App.tsx`.

#### Scenario: Asset allocation chart renders via AllocationChart
- **WHEN** the dashboard renders with loaded portfolio data
- **THEN** an `AllocationChart` with title "Asset Allocation" is rendered using `allocations.byAssetClass` data
