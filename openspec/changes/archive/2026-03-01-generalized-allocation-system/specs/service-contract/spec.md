## REMOVED Requirements

### Requirement: StockPosition includes all pre-computed per-holding metrics
**Reason**: `portfolioWeight` is removed from `StockPosition` — it now lives in `allocations.byHolding`. The remaining five pre-computed fields (`marketValue`, `unrealizedGain`, `unrealizedGainPercentage`, `dailyChange`, `dailyChangePercentage`) are still required.
**Migration**: Any code reading `position.portfolioWeight` must instead look up the matching entry in `portfolio.allocations.byHolding` where `key === position.ticker`.

### Requirement: PortfolioSummary includes pre-computed asset allocation breakdown
**Reason**: Replaced by the generalized `allocations` object. The `assetAllocation: AssetAllocationBreakdown[]` field is removed; `AssetAllocationBreakdown` is deleted.
**Migration**: Use `portfolio.allocations.byAssetClass` (type `AllocationBreakdown[]`) in place of `portfolio.assetAllocation`.

## ADDED Requirements

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
