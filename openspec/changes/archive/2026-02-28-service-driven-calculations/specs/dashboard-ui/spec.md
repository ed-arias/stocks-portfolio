## MODIFIED Requirements

### Requirement: Holdings table displays all positions with readable data alignment
The holdings table SHALL display ticker, shares, average cost, current price, total value, and profit/loss columns. All values SHALL be read directly from the `StockPosition` fields returned by the service — the component SHALL NOT perform any arithmetic. Numeric columns SHALL use `font-variant-numeric: tabular-nums` and JetBrains Mono. The ticker cell SHALL show the company name as a subordinate sub-label. The profit/loss column SHALL show the dollar value and percentage stacked vertically, color-coded with success/danger tokens.

#### Scenario: Holdings render for all positions
- **WHEN** portfolio data is loaded
- **THEN** one table row is rendered per position with all six columns populated using pre-computed fields from the service response

#### Scenario: Profit/loss is color-coded per row
- **WHEN** a position has a positive `unrealizedGain`
- **THEN** that cell renders in `--success`; when `unrealizedGain` is negative, in `--danger`

#### Scenario: Table rows have a hover state
- **WHEN** the user hovers over a table row
- **THEN** the row background changes to `--bg-subtle`

#### Scenario: No arithmetic in component render
- **WHEN** the holdings table renders
- **THEN** no multiplication, division, or subtraction is performed inside the component — all values come directly from position fields
