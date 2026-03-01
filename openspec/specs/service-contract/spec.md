# service-contract Specification

## Purpose
TBD - created by archiving change service-driven-calculations. Update Purpose after archive.

## Requirements

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

### Requirement: StockService exposes getPortfolioHistory method
`StockService` SHALL expose a `getPortfolioHistory(period: Period): Promise<PortfolioHistoryPoint[]>` method. The `Period` type SHALL be a union: `'1W' | '1M' | '3M' | 'YTD' | '1Y' | 'All'`. The `PortfolioHistoryPoint` type SHALL have exactly two fields: `date: string` (ISO 8601 date, YYYY-MM-DD) and `value: number` (portfolio total value in USD).

#### Scenario: Method resolves for every period
- **WHEN** `StockService.getPortfolioHistory(period)` is called with any valid `Period` value
- **THEN** the promise resolves with a non-empty `PortfolioHistoryPoint[]` array

#### Scenario: Mock returns pre-computed static fixtures
- **WHEN** `getPortfolioHistory` is called
- **THEN** the returned array contains literal date and value pairs with no runtime computation

#### Scenario: Each period returns an appropriate number of data points
- **WHEN** `getPortfolioHistory` is called with each period
- **THEN** `1W` returns ~7 points, `1M` returns ~21 points, `3M` returns ~60 points, `YTD` returns points from Jan 1 to today, `1Y` returns ~252 points, and `All` returns at least 1 year of daily data

#### Scenario: Types are exported from src/types/index.ts
- **WHEN** a component imports `Period` or `PortfolioHistoryPoint`
- **THEN** both types are available as named exports from `src/types/index.ts`

### Requirement: StockPosition includes assetClass field
The `StockPosition` type SHALL include an `assetClass: AssetClass` field. `AssetClass` SHALL be a union type `'stock' | 'etf' | 'crypto' | 'cash'` exported from `src/types/index.ts`. The backend assigns this field per holding — the frontend SHALL NOT infer or derive it.

#### Scenario: assetClass is present on every position
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** every entry in `positions[]` contains a non-null `assetClass` value that is one of the four valid union members

### Requirement: PortfolioSummary includes pre-computed asset allocation breakdown
The `PortfolioSummary` type SHALL include an `assetAllocation: AssetAllocationBreakdown[]` field. `AssetAllocationBreakdown` SHALL be an interface exported from `src/types/index.ts` with the following required fields: `assetClass: AssetClass`, `value: number` (total market value in USD), and `percentage: number` (share of total portfolio value, 0–100). Display labels are a frontend concern and SHALL NOT be returned by the backend. The backend pre-computes this array by grouping positions by `assetClass` and summing their `marketValue` — the frontend SHALL NOT perform this aggregation.

#### Scenario: assetAllocation is present in service response
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** `assetAllocation` is a non-empty array where every entry has non-null values for `assetClass`, `value`, and `percentage`

#### Scenario: assetAllocation percentages sum to 100
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** the sum of `percentage` across all `assetAllocation` entries equals 100 (within floating point tolerance)

#### Scenario: Types are exported from src/types/index.ts
- **WHEN** a component imports `AssetClass` or `AssetAllocationBreakdown`
- **THEN** both types are available as named exports from `src/types/index.ts`

