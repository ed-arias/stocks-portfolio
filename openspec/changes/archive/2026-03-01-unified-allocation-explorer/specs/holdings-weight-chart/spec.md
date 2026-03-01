## MODIFIED Requirements

### Requirement: Holdings weight chart renders per-position allocation breakdown
The dashboard SHALL render the holdings weight breakdown as an `AllocationDimension` entry in `AllocationExplorer`'s `views` array with `key: 'byHolding'`, `label: 'Holdings'`, `title: 'Holdings Weight'`, and `data: portfolio.allocations.byHolding`. The chart SHALL be visible when the user selects the "Holdings" pill in `AllocationExplorer`.

#### Scenario: Holdings chart renders one segment per position
- **WHEN** `portfolio.allocations.byHolding` contains N entries and the "Holdings" pill is active
- **THEN** the "Holdings Weight" chart renders N non-zero segments (assuming all positions have value)

#### Scenario: Holdings chart is accessible via pill selector
- **WHEN** the user clicks the "Holdings" pill
- **THEN** the holdings weight chart becomes visible, replacing the previously active dimension

### Requirement: Both allocation charts assign colors algorithmically using a pastel HSL palette
Both the asset allocation and holdings weight `AllocationChart` instances SHALL derive segment colors via a shared `holdingColor(idx, total)` function that spreads hues evenly across 360° using `hsl((idx / total) * 360, 55%, 75%)`. This guarantees every segment has a unique color regardless of the number of entries, and produces a consistent pastel aesthetic across both charts.

#### Scenario: Unique color per segment
- **WHEN** an `AllocationChart` renders N entries
- **THEN** each segment receives a distinct hue evenly distributed across the color wheel

#### Scenario: Colors are pastel
- **WHEN** `holdingColor` produces a color
- **THEN** the resulting `hsl` value has saturation ≤ 60% and lightness ≥ 70%

### Requirement: Holdings weight tooltip shows ticker and company name
The `labelFn` passed to the holdings weight dimension SHALL produce a string of the form `"<TICKER> · <Company Name>"` by looking up the matching `StockPosition` from `portfolio.positions` where `ticker === item.key`. If no match is found, the label SHALL fall back to `item.key`.

#### Scenario: Tooltip label includes company name
- **WHEN** the user hovers over a holdings segment whose `key` matches a position's ticker
- **THEN** the tooltip label reads "<TICKER> · <Company Name>"

#### Scenario: Label falls back to ticker when position not found
- **WHEN** `item.key` does not match any position's ticker
- **THEN** the label is `item.key` alone

### Requirement: Loading skeleton includes a single placeholder for the allocation explorer
The loading shimmer in `App.tsx` SHALL render exactly one allocation skeleton block for the unified `AllocationExplorer` card. The separate `.skeleton-alloc-holdings` block is removed.

#### Scenario: One allocation skeleton during loading
- **WHEN** the dashboard is in loading state
- **THEN** exactly one shimmer block with allocation chart proportions is visible
