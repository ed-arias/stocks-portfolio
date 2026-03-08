## ADDED Requirements

### Requirement: StockPosition includes optional analystRating field
The `StockPosition` type SHALL include an optional field `analystRating?: AnalystRating`. The backend provides this field when analyst coverage exists for the instrument; it SHALL be `undefined` for assets with no coverage (e.g., crypto). The frontend SHALL NOT compute or derive this value.

#### Scenario: analystRating is present for covered positions
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** stock and ETF positions in the mock data have a non-null `analystRating` with a valid `label` and a positive `analystCount`

#### Scenario: analystRating is absent for uncovered positions
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** crypto positions in the mock data have `analystRating` as `undefined`

#### Scenario: Mock data covers all five rating tiers
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** the positions collectively include at least one example of each of the five rating labels: 'Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'
