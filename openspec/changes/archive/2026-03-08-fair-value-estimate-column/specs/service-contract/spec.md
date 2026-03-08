## ADDED Requirements

### Requirement: StockPosition includes optional fairValue field
The `StockPosition` type SHALL include an optional field `fairValue?: FairValueEstimate`. The backend provides this field when a fair value estimate is available for the instrument; it SHALL be `undefined` for assets with no estimate (e.g., crypto). The frontend SHALL NOT compute or derive the `price` field — only the display upside % is a frontend calculation.

#### Scenario: fairValue is present for covered positions
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** stock and ETF positions in the mock data have a non-null `fairValue` with a valid `price` and a non-empty `source` string

#### Scenario: fairValue is absent for uncovered positions
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** crypto positions in the mock data have `fairValue` as `undefined`

#### Scenario: Mock data covers all three valuation tiers
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** the positions collectively include at least one Undervalued (upside > 10%), one Fair (−10% to 10%), and one Overvalued (upside < −10%) position
