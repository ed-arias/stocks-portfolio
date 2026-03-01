# service-contract Specification

## Purpose
TBD - created by archiving change service-driven-calculations. Update Purpose after archive.

## Requirements

### Requirement: StockPosition includes all pre-computed per-holding metrics
The `StockPosition` type SHALL include the following required fields returned by the backend: `marketValue`, `unrealizedGain`, `unrealizedGainPercentage`, `dailyChange`, and `dailyChangePercentage`. None of these fields SHALL be computed by the frontend.

#### Scenario: Position fields are present in service response
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** every position in `positions[]` contains non-null values for all five pre-computed fields

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

### Requirement: AllocationBreakdown is the generic allocation type
The `AllocationBreakdown` interface SHALL be exported from `src/types/index.ts` with exactly three fields: `key: string` (dimension-specific identifier — asset class key, ticker, etc.), `value: number` (total market value in USD), and `percentage: number` (portfolio weight 0–100). `AssetAllocationBreakdown` SHALL be removed.

#### Scenario: AllocationBreakdown is importable from types
- **WHEN** a component imports `AllocationBreakdown`
- **THEN** it is available as a named export from `src/types/index.ts`

#### Scenario: AssetAllocationBreakdown is not present
- **WHEN** a file imports `AssetAllocationBreakdown` from `src/types/index.ts`
- **THEN** the TypeScript compiler reports an error (export does not exist)

### Requirement: PortfolioSummary includes allocations object with byAssetClass and byHolding
The `PortfolioSummary` type SHALL include `allocations: { byAssetClass: AllocationBreakdown[]; byHolding: AllocationBreakdown[] }`. The `assetAllocation` field SHALL be removed. `byAssetClass` groups positions by asset class; `byHolding` has one entry per position with `key === ticker` and `percentage` equal to the holding's portfolio weight.

#### Scenario: allocations object present in service response
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** the result contains `allocations.byAssetClass` (non-empty array) and `allocations.byHolding` (one entry per position)

#### Scenario: byHolding percentages sum to 100
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** the sum of `percentage` across all `allocations.byHolding` entries equals 100 (within floating point tolerance)

#### Scenario: byAssetClass percentages sum to 100
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** the sum of `percentage` across all `allocations.byAssetClass` entries equals 100 (within floating point tolerance)

### Requirement: StockPosition does not include portfolioWeight
The `StockPosition` type SHALL NOT include a `portfolioWeight` field. Per-holding portfolio weight data is exclusively available via `allocations.byHolding`.

#### Scenario: portfolioWeight absent from StockPosition
- **WHEN** a component accesses `position.portfolioWeight`
- **THEN** the TypeScript compiler reports an error (property does not exist)

