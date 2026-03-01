# allocation-explorer Specification

## Purpose
A unified `AllocationExplorer` component that replaces the two separate `AllocationChart` instances on the dashboard. It renders a single card with an iOS-style segmented pill selector at the top; selecting a pill swaps the active `AllocationChart` and replays its donut entry animation.

## Requirements

### Requirement: AllocationExplorer renders a single card with a dimension pill selector
The dashboard SHALL render a single `AllocationExplorer` component in place of the two separate `AllocationChart` instances. `AllocationExplorer` SHALL accept a `views` prop (array of `AllocationDimension`) and render an iOS-style segmented pill selector above the active `AllocationChart`. The active pill SHALL be filled with `var(--accent)` background and white text; inactive pills SHALL use `var(--text-muted)` text and a transparent background.

#### Scenario: Pill selector shows one pill per dimension
- **WHEN** `AllocationExplorer` is rendered with N dimensions
- **THEN** N pills are visible in the selector row, each labeled with the dimension's `label`

#### Scenario: First dimension is active by default
- **WHEN** `AllocationExplorer` mounts
- **THEN** the first dimension in `views` is selected and its chart is rendered

#### Scenario: Clicking a pill switches the active dimension
- **WHEN** the user clicks an inactive pill
- **THEN** the corresponding dimension becomes active, its chart data is rendered, and the pill becomes filled

### Requirement: Dimension switch replays the donut entry animation
`AllocationExplorer` SHALL pass `key={activeKey}` to `AllocationChart` so that switching dimensions forces a remount, replaying the donut expansion animation from zero.

#### Scenario: Animation replays on dimension switch
- **WHEN** the user switches from one dimension to another
- **THEN** the donut segments animate from zero to their target arc lengths

### Requirement: AllocationDimension interface bundles all per-view props
The `AllocationDimension` interface SHALL be defined in `AllocationExplorer.tsx` with fields: `key: string`, `label: string`, `title: string`, `data: AllocationBreakdown[]`, `colorFn: (item: AllocationBreakdown) => string`, `labelFn: (item: AllocationBreakdown) => string`.

#### Scenario: Dimension object supplies all chart props
- **WHEN** an `AllocationDimension` is the active view
- **THEN** its `data`, `title`, `colorFn`, and `labelFn` are passed to `AllocationChart` as-is

### Requirement: Adding a new dimension requires no component changes
The `views` prop of `AllocationExplorer` SHALL be an open-ended array; any additional `AllocationDimension` appended to the array in `App.tsx` SHALL render a new pill and chart without changes to `AllocationExplorer`.

#### Scenario: Third dimension renders correctly
- **WHEN** a third entry is appended to the `views` array
- **THEN** a third pill appears and its chart renders when selected

### Requirement: Loading state shows a single allocation skeleton
The `LoadingState` in `App.tsx` SHALL render exactly one allocation shimmer block (`.skeleton-alloc`) — the `.skeleton-alloc-holdings` block SHALL be removed.

#### Scenario: Single skeleton during loading
- **WHEN** the dashboard is in loading state
- **THEN** exactly one allocation shimmer block is visible
