## Why

The dashboard currently stacks two separate `AllocationChart` cards vertically — one for asset class, one for holdings weight — consuming significant vertical space and lacking a scalable pattern for adding future allocation dimensions (sector, geography, market cap). Collapsing them into a single card with a dimension selector reduces visual noise and establishes an extensible architecture.

## What Changes

- Introduce a new `AllocationExplorer` component that wraps `AllocationChart` with an iOS-style segmented pill selector for switching between allocation dimensions
- Replace both standalone `AllocationChart` usages in `App.tsx` with a single `AllocationExplorer` instance
- Remove the duplicate allocation skeleton from the loading state (two skeletons → one)
- Define an `AllocationDimension` interface (UI-layer type) capturing `key`, `label`, `title`, `data`, `colorFn`, and `labelFn` per view
- Existing `AllocationChart` component remains unchanged — pure donut renderer

## Capabilities

### New Capabilities

- `allocation-explorer`: A dimension-aware allocation card that renders a segmented pill selector and delegates rendering to `AllocationChart`; adding a new dimension requires only appending to a `views` array — no component changes

### Modified Capabilities

- `asset-allocation-chart`: The asset allocation chart is no longer a standalone card; it is now rendered as a dimension within the `AllocationExplorer` — the underlying spec requirement (show allocation breakdown as a donut) is unchanged, but its surface changes from an independent card to a tab within the explorer
- `holdings-weight-chart`: Same as above — rendered as a dimension within `AllocationExplorer` rather than a standalone card

## Impact

- `src/features/AllocationExplorer/AllocationExplorer.tsx` — new file
- `src/App.tsx` — swap two `AllocationChart` renders for one `AllocationExplorer`; remove `AllocationChart` import
- `src/App.css` — remove `.skeleton-alloc-holdings` rule; remove corresponding element from `LoadingState`
- `CHANGELOG.md`, `BACKLOG.md` — documentation updates
- No backend contract changes; no new data required
