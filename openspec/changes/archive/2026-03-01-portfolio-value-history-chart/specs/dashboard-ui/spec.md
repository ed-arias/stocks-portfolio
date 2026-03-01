## ADDED Requirements

### Requirement: Dashboard layout includes a chart section between cards and table
The dashboard SHALL render a `PortfolioChart` component in a dedicated chart section placed after the `.summary-cards` grid and before the `.holdings-section`. The chart section SHALL have the same horizontal padding as the summary cards and holdings table to maintain visual alignment.

#### Scenario: Chart section is present on load
- **WHEN** portfolio data has loaded
- **THEN** the chart section is visible between the summary cards row and the holdings table with consistent horizontal alignment

#### Scenario: Chart section is included in the loading skeleton
- **WHEN** portfolio data has not yet resolved
- **THEN** the shimmer skeleton includes a chart skeleton block in the correct position between the cards skeleton and the table skeleton
