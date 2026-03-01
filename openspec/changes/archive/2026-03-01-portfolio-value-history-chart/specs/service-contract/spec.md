## ADDED Requirements

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
