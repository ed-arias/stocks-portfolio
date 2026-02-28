## ADDED Requirements

### Requirement: StockPosition includes all pre-computed per-holding metrics
The `StockPosition` type SHALL include the following required fields returned by the backend: `marketValue`, `unrealizedGain`, `unrealizedGainPercentage`, `dailyChange`, `dailyChangePercentage`, and `portfolioWeight`. None of these fields SHALL be computed by the frontend.

#### Scenario: Position fields are present in service response
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** every position in `positions[]` contains non-null values for all six pre-computed fields

#### Scenario: portfolioWeight sums to 100
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** the sum of `portfolioWeight` across all positions equals 100 (within floating point tolerance)

### Requirement: PortfolioSummary includes total return fields
The `PortfolioSummary` type SHALL include `totalReturn: number` and `totalReturnPercentage: number` as required fields returned by the backend.

#### Scenario: Total return fields are present in service response
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** `totalReturn` and `totalReturnPercentage` are present and finite numbers

### Requirement: StockService mock returns static pre-computed fixtures
The `StockService` mock SHALL return a single hardcoded response object with all fields populated as static values. The mock SHALL NOT derive or compute any field at runtime.

#### Scenario: Mock returns without any runtime arithmetic
- **WHEN** `StockService.getPortfolioSummary()` is called
- **THEN** the returned object contains all required fields as literal values with no runtime computation
