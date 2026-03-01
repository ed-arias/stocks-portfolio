## MODIFIED Requirements

### Requirement: Holdings table displays all positions with readable data alignment
The holdings table SHALL display ticker, shares, average cost, current price, total value, profit/loss, and **daily change** columns. All values SHALL be read directly from the `StockPosition` fields returned by the service — the component SHALL NOT perform any arithmetic. Numeric columns SHALL use `font-variant-numeric: tabular-nums` and JetBrains Mono. The ticker cell SHALL show the company name as a subordinate sub-label. The profit/loss column SHALL show the dollar value and percentage stacked vertically, color-coded with success/danger tokens. The daily change column SHALL show `dailyChange` (absolute, formatted as currency) and `dailyChangePercentage` (%) stacked vertically in the same layout as the profit/loss column, color-coded green when `dailyChange >= 0` and red when `dailyChange < 0`.

#### Scenario: Holdings render for all positions
- **WHEN** portfolio data is loaded
- **THEN** one table row is rendered per position with all seven columns populated using pre-computed fields from the service response

#### Scenario: Daily change is color-coded per row
- **WHEN** a position has a positive or zero `dailyChange`
- **THEN** the daily change cell renders in `--success`; when `dailyChange` is negative, in `--danger`

#### Scenario: Profit/loss is color-coded per row
- **WHEN** a position has a positive `unrealizedGain`
- **THEN** that cell renders in `--success`; when `unrealizedGain` is negative, in `--danger`

#### Scenario: Table rows have a hover state
- **WHEN** the user hovers over a table row
- **THEN** the row background changes to `--bg-subtle`

#### Scenario: No arithmetic in component render
- **WHEN** the holdings table renders
- **THEN** no multiplication, division, or subtraction is performed inside the component — all values come directly from position fields
