# total-return-card Specification

## Purpose
TBD - created by archiving change total-return-card. Update Purpose after archive.
## Requirements
### Requirement: PortfolioSummary includes total return fields
The `PortfolioSummary` type SHALL include `totalReturn: number` (absolute USD) and `totalReturnPercentage: number`. `StockService` SHALL compute these as the difference between current market value and total cost basis across all positions.

#### Scenario: Total return is computed correctly
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** `totalReturn` equals the sum of `(shares × currentPrice) − (shares × avgCost)` across all positions and `totalReturnPercentage` equals `totalReturn / totalCostBasis × 100`

### Requirement: Dashboard displays a Total Return card
The dashboard SHALL render a third summary card labelled "Total Return" displaying `totalReturn` as a formatted currency value and `totalReturnPercentage` as a percentage. The card SHALL use the same iOS-style pill badge as the Day Gain/Loss card, colored with `--success` tokens when positive and `--danger` tokens when negative.

#### Scenario: Positive total return renders in success color
- **WHEN** `totalReturn` is greater than or equal to zero
- **THEN** the card displays the value and percentage in a pill badge with `--success` text on `--success-bg` background

#### Scenario: Negative total return renders in danger color
- **WHEN** `totalReturn` is less than zero
- **THEN** the card displays the value and percentage in a pill badge with `--danger` text on `--danger-bg` background

#### Scenario: Total Return card animates in after Day Gain/Loss card
- **WHEN** portfolio data finishes loading
- **THEN** the Total Return card appears with a staggered `fadeUp` animation after the preceding cards

