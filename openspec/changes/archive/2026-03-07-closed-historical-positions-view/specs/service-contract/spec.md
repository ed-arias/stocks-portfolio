## ADDED Requirements

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
