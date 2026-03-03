## ADDED Requirements

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
