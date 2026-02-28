## Why

The frontend currently computes financial metrics inline in JSX (`totalValue`, `pl`, `plPct` per position). The UI layer should only format and display data — all financial calculations belong in the backend service. This change enforces that boundary.

## What Changes

- Extend `StockPosition` with pre-computed per-holding fields: `marketValue`, `unrealizedGain`, `unrealizedGainPercentage`, `dailyChange`, `dailyChangePercentage`, `portfolioWeight`
- Extend `PortfolioSummary` with `totalReturn` and `totalReturnPercentage`
- Update `StockService` mock to return all fields as static fixtures (representing what a real backend computes and returns)
- Remove all financial calculations from `App.tsx` — components only format and render
- Update `README.md` API contract to document the full response shape

## Capabilities

### New Capabilities
- `service-contract`: The full typed API contract between frontend and backend — defines every field the backend is responsible for computing

### Modified Capabilities
- `dashboard-ui`: Components no longer compute derived values; render pre-computed fields from the service response directly

## Impact

- `src/types/index.ts` — extend `StockPosition` and `PortfolioSummary` with pre-computed fields
- `src/services/StockService.ts` — replace dynamic computations with static mock fixtures covering all new fields
- `src/App.tsx` — remove inline calculations; read and render fields directly from position data
- `README.md` — update `GET /portfolio/summary` response schema and TypeScript types to reflect the complete contract
- Note: supersedes data layer tasks in `total-return-card` — `totalReturn` and `totalReturnPercentage` are covered here
