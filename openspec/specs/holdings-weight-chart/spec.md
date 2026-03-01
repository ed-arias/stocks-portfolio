# holdings-weight-chart Specification

## Purpose
Dashboard section that renders an `AllocationChart` instance showing per-position portfolio weight breakdown. Uses the generic `AllocationChart` component with algorithmically assigned pastel HSL colors and a `labelFn` that produces "TICKER · Company Name" labels by looking up positions from `portfolio.positions`.

## Requirements

### Requirement: Holdings weight chart renders per-position allocation breakdown
The dashboard SHALL render an `AllocationChart` instance titled "Holdings Weight" displaying `portfolio.allocations.byHolding`. Each entry in `byHolding` corresponds to one `StockPosition` identified by `key === ticker`. The chart SHALL appear below the asset allocation chart and above the holdings table.

#### Scenario: Holdings chart renders one segment per position
- **WHEN** `portfolio.allocations.byHolding` contains N entries
- **THEN** the "Holdings Weight" chart renders N non-zero segments (assuming all positions have value)

#### Scenario: Holdings chart appears between allocation chart and table
- **WHEN** the dashboard renders
- **THEN** the asset allocation chart is above the holdings weight chart, which is above the holdings table

### Requirement: Both allocation charts assign colors algorithmically using a pastel HSL palette
Both the asset allocation and holdings weight `AllocationChart` instances SHALL derive segment colors via a shared `holdingColor(idx, total)` function that spreads hues evenly across 360° using `hsl((idx / total) * 360, 55%, 75%)`. This guarantees every segment has a unique color regardless of the number of entries, and produces a consistent pastel aesthetic across both charts.

#### Scenario: Unique color per segment
- **WHEN** an `AllocationChart` renders N entries
- **THEN** each segment receives a distinct hue evenly distributed across the color wheel

#### Scenario: Colors are pastel
- **WHEN** `holdingColor` produces a color
- **THEN** the resulting `hsl` value has saturation ≤ 60% and lightness ≥ 70%

### Requirement: Holdings weight tooltip shows ticker and company name
The `labelFn` passed to the holdings weight `AllocationChart` SHALL produce a string of the form `"<TICKER> · <Company Name>"` by looking up the matching `StockPosition` from `portfolio.positions` where `ticker === item.key`. If no match is found, the label SHALL fall back to `item.key`.

#### Scenario: Tooltip label includes company name
- **WHEN** the user hovers over a holdings segment whose `key` matches a position's ticker
- **THEN** the tooltip label reads "<TICKER> · <Company Name>"

#### Scenario: Label falls back to ticker when position not found
- **WHEN** `item.key` does not match any position's ticker
- **THEN** the label is `item.key` alone

### Requirement: Loading skeleton includes a placeholder for the holdings weight chart
The loading shimmer in `App.tsx` SHALL render a second allocation skeleton block below the existing one, with the same dimensions as the holdings weight chart (height ≥ 260px, border-radius: 16px).

#### Scenario: Two allocation skeletons during loading
- **WHEN** the dashboard is in loading state
- **THEN** two shimmer blocks with allocation chart proportions are visible
