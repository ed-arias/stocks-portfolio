## MODIFIED Requirements

### Requirement: Asset allocation chart uses AllocationChart with algorithmic colorFn and labelFn
The dashboard SHALL render the asset allocation breakdown via an `AllocationDimension` entry in `AllocationExplorer`'s `views` array with `key: 'byAssetClass'`, `label: 'Asset Class'`, `title: 'Asset Allocation'`, `data: portfolio.allocations.byAssetClass`, `colorFn` using `holdingColor(idx, total)` by index in `byAssetClass`, and `labelFn` mapping keys via `ASSET_CLASS_LABELS`. The `AllocationChart` component SHALL be invoked by `AllocationExplorer` — not directly by `App.tsx`.

#### Scenario: Asset allocation chart renders via AllocationExplorer
- **WHEN** the dashboard renders with loaded portfolio data and the "Asset Class" pill is active
- **THEN** an `AllocationChart` with title "Asset Allocation" is rendered using `allocations.byAssetClass` data
