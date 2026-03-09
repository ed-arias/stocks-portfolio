## Why

The 2-column dashboard grid (chart left, right rail with Total Return card + AllocationExplorer) caused the portfolio chart card to grow vertically to match the right-rail height, wasting ~500px of real estate with blank chart area. The AllocationExplorer renders its donut and legend horizontally — at full width it is naturally ~280px tall; at the constrained 300px rail it forced the legend to wrap below the donut, inflating height to ~560px and dragging the chart card with it.

## What Changes

- Remove the `dashboard-grid` 2-column CSS grid and `.chart-panel` / `.right-rail` wrappers
- Portfolio chart becomes a full-width section with a fixed sensible height (280px)
- AllocationExplorer becomes a full-width section; its horizontal donut+legend layout stays at ~280px without wrapping
- Holdings table remains full-width (unchanged)
- Total Return card removed from right rail; metric promoted into the sticky top bar alongside portfolio value, separated by a vertical rule
- Top bar now shows: `[◆ Portfolio]  ···  [$124,500  ▲ $320 today]  |  [Total Return  ▲ $18,200 (14.6%)]  ···  [☀]`
- Total Return group is hidden at ≤900px (not enough horizontal space)

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `dashboard-layout`: Remove 2-column grid requirement; add full-width stacked sections requirement; add top-bar Total Return metric requirement; add responsive hide rule for top-bar return group at ≤900px

## Impact

- `src/App.tsx`: `TopBar` receives two new props (`totalReturn`, `totalReturnPercentage`); main render removes `dashboard-grid`/`chart-panel`/`right-rail` divs; `AllocationExplorer` rendered as a direct child of `<main>`; Total Return card JSX removed; `LoadingState` skeleton simplified to sequential full-width blocks
- `src/App.css`: `.dashboard-grid`, `.chart-panel`, `.right-rail`, `.skeleton-dashboard-grid`, `.skeleton-right-rail` removed; `.top-bar-return-group`, `.top-bar-sep`, `.top-bar-return-label` added; responsive rule hides `.top-bar-return-group` at ≤900px
- `src/features/PortfolioChart/PortfolioChart.tsx`: `<div className="chart-body">` wrapper removed; `height="100%"` reverted to `height={280}`
- `src/features/PortfolioChart/PortfolioChart.css`: `.chart-section` flex chain removed; `.chart-body` rule removed
