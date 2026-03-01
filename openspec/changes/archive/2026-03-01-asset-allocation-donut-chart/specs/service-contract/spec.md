## ADDED Requirements

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
