## MODIFIED Requirements

### Requirement: StockPosition includes all pre-computed per-holding metrics
The `StockPosition` type SHALL include the following required fields returned by the backend: `marketValue`, `unrealizedGain`, `unrealizedGainPercentage`, `dailyChange`, `dailyChangePercentage`, and `dividendYield`. None of these fields SHALL be computed by the frontend. `dividendYield` is the annual dividend yield as a percentage (e.g., `1.45` means 1.45%). Non-dividend-paying assets SHALL have `dividendYield: 0`.

#### Scenario: Position fields are present in service response
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** every position in `positions[]` contains non-null values for all six pre-computed fields including `dividendYield`

#### Scenario: Non-dividend-paying position has dividendYield of zero
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** positions for assets that do not pay dividends (e.g., crypto) have `dividendYield === 0`
