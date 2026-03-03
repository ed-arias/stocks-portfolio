## ADDED Requirements

### Requirement: StockPosition includes pre-computed total return fields
The `StockPosition` type SHALL include `totalReturn: number` and `totalReturnPercentage: number` as required fields returned by the backend. `totalReturn` is the absolute total return in USD (unrealized capital gain + all dividends received). `totalReturnPercentage` is the total return relative to cost basis, expressed as a percentage (e.g., `25.50` means 25.50%). Neither field SHALL be computed by the frontend.

#### Scenario: Total return fields are present in service response
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** every position in `positions[]` contains non-null `totalReturn` and `totalReturnPercentage` values

#### Scenario: totalReturn is greater than or equal to unrealizedGain for dividend payers
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** for positions with `dividendYield > 0`, `totalReturn` is greater than or equal to `unrealizedGain`

#### Scenario: totalReturn equals unrealizedGain for non-dividend-paying assets
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** for positions with `dividendYield === 0`, `totalReturn` equals `unrealizedGain`
