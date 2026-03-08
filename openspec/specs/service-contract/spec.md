# service-contract Specification

## Purpose
TBD - created by archiving change service-driven-calculations. Update Purpose after archive.

## Requirements

### Requirement: StockPosition includes all pre-computed per-holding metrics
The `StockPosition` type SHALL include the following required fields returned by the backend: `marketValue`, `unrealizedGain`, `unrealizedGainPercentage`, `dailyChange`, `dailyChangePercentage`, and `dividendYield`. None of these fields SHALL be computed by the frontend. `dividendYield` is the annual dividend yield as a percentage (e.g., `1.45` means 1.45%). Non-dividend-paying assets SHALL have `dividendYield: 0`.

#### Scenario: Position fields are present in service response
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** every position in `positions[]` contains non-null values for all six pre-computed fields including `dividendYield`

#### Scenario: Non-dividend-paying position has dividendYield of zero
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** positions for assets that do not pay dividends (e.g., crypto) have `dividendYield === 0`

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

### Requirement: Transaction type is a four-variant union
A `TransactionType` union type SHALL be exported from `src/types/index.ts` with exactly four members: `'buy' | 'sell' | 'dividend' | 'split'`.

#### Scenario: TransactionType is importable from types
- **WHEN** a component imports `TransactionType` from `src/types/index.ts`
- **THEN** it resolves to the union `'buy' | 'sell' | 'dividend' | 'split'`

### Requirement: Transaction interface captures per-event data
A `Transaction` interface SHALL be exported from `src/types/index.ts` with the following fields: `id: string`, `date: string` (ISO 8601), `type: TransactionType`, `shares: number | null` (null for dividend), `price: number | null` (null for dividend and split), `amount: number | null` (null for split).

#### Scenario: Transaction interface is importable from types
- **WHEN** a component imports `Transaction` from `src/types/index.ts`
- **THEN** all required fields are present and typed correctly

### Requirement: StockPosition includes a transactions array
The `StockPosition` type SHALL include a `transactions: Transaction[]` field. The array SHALL be pre-populated by the backend and SHALL NOT be computed by the frontend. An empty array is valid for positions with no recorded transactions.

#### Scenario: transactions field is present on every position
- **WHEN** `StockService.getPortfolioSummary()` resolves
- **THEN** every entry in `positions[]` contains a `transactions` field that is an array (may be empty)

#### Scenario: Mock positions include realistic sample transactions
- **WHEN** `StockService.getPortfolioSummary()` resolves in the mock environment
- **THEN** at least one position has 3 or more transactions covering multiple transaction types

### Requirement: ClosedPosition type captures post-trade data
A `ClosedPosition` interface SHALL be exported from `src/types/index.ts` with the following fields: `id: string`, `ticker: string`, `companyName: string`, `assetClass: AssetClass`, `shares: number`, `avgCost: number`, `exitPrice: number`, `realizedGain: number`, `realizedGainPercentage: number`, `openDate: string` (ISO 8601 date), `closeDate: string` (ISO 8601 date), `holdDays: number`. All fields SHALL be pre-computed by the backend; the frontend SHALL NOT compute any of them.

#### Scenario: ClosedPosition is importable from types
- **WHEN** a component imports `ClosedPosition` from `src/types/index.ts`
- **THEN** all required fields are present and typed correctly

#### Scenario: realizedGainPercentage is negative for losing trades
- **WHEN** `exitPrice` is less than `avgCost`
- **THEN** `realizedGain` is a negative number and `realizedGainPercentage` is also negative

### Requirement: StockService exposes getClosedPositions method
`StockService` SHALL expose a `getClosedPositions(): Promise<ClosedPosition[]>` method. The mock implementation SHALL return a static array of at least three `ClosedPosition` fixtures spanning at least two asset classes, with a mix of profitable and losing trades.

#### Scenario: Method resolves with a non-empty array
- **WHEN** `StockService.getClosedPositions()` is called
- **THEN** the promise resolves with an array containing at least three entries

#### Scenario: Mock returns pre-computed static fixtures
- **WHEN** `StockService.getClosedPositions()` is called
- **THEN** the returned array contains literal field values with no runtime computation

#### Scenario: Mock data spans multiple asset classes
- **WHEN** `StockService.getClosedPositions()` resolves
- **THEN** the entries include positions from at least two different `assetClass` values

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
