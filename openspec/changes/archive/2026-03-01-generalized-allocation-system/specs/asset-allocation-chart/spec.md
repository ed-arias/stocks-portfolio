## REMOVED Requirements

### Requirement: Asset allocation donut chart renders all asset class segments
**Reason**: Replaced by the generic `AllocationChart` component. The `AssetAllocationChart` component is deleted; asset-class rendering is now handled by `AllocationChart` with a caller-supplied `colorFn` and `labelFn`.
**Migration**: Replace `<AssetAllocationChart data={...} />` with `<AllocationChart data={portfolio.allocations.byAssetClass} title="Asset Allocation" colorFn={...} labelFn={...} />`.

### Requirement: Chart displays a color-coded legend
**Reason**: Legend behavior is preserved in `AllocationChart` — this requirement is subsumed by `AllocationChart`'s legend requirement.
**Migration**: No action needed; `AllocationChart` renders a legend identically.

### Requirement: Hovering a segment shows a tooltip
**Reason**: Tooltip behavior is preserved in `AllocationChart` — this requirement is subsumed by `AllocationChart`'s tooltip requirement.
**Migration**: No action needed; `AllocationChart` renders a tooltip identically.

### Requirement: Chart component performs no arithmetic
**Reason**: Subsumed by `AllocationChart`'s no-arithmetic requirement.
**Migration**: No action needed.

## ADDED Requirements

### Requirement: Asset allocation chart uses AllocationChart with algorithmic colorFn and labelFn
The dashboard SHALL render `<AllocationChart data={portfolio.allocations.byAssetClass} title="Asset Allocation" colorFn={...} labelFn={...} />`. The `colorFn` SHALL use `holdingColor(idx, total)` to assign a unique pastel hue to each asset class by its index in `byAssetClass`. The `labelFn` SHALL map `key` strings to human-readable labels via a module-scope `ASSET_CLASS_LABELS` constant in `App.tsx`.

#### Scenario: Asset allocation chart renders via AllocationChart
- **WHEN** the dashboard renders with loaded portfolio data
- **THEN** an `AllocationChart` with title "Asset Allocation" is rendered using `allocations.byAssetClass` data
