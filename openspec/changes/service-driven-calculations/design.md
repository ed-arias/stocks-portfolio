## Context

`StockService` acts as the frontend's proxy for the backend API. Currently it computes `totalValue` dynamically and `App.tsx` computes `totalValue`, `pl`, and `plPct` per position inline in JSX. The backend is the authoritative source for all financial metrics — the frontend should never derive them.

## Goals / Non-Goals

**Goals:**
- Define the complete backend response contract as TypeScript types
- Update the mock to return all fields as pre-computed static values
- Strip all financial calculations from `App.tsx`
- Update `README.md` to document the full API shape

**Non-Goals:**
- Adding new UI cards or columns (separate changes)
- Real backend integration
- Validation or error handling for missing fields

## Decisions

### Extended `StockPosition` fields

| Field | Type | Description |
|---|---|---|
| `marketValue` | `number` | `shares × currentPrice` |
| `unrealizedGain` | `number` | `marketValue − (shares × avgCost)` |
| `unrealizedGainPercentage` | `number` | `unrealizedGain / (shares × avgCost) × 100` |
| `dailyChange` | `number` | Absolute $ change today for this position |
| `dailyChangePercentage` | `number` | % change today for this position |
| `portfolioWeight` | `number` | `marketValue / totalPortfolioValue × 100` |

All fields are **required** — the backend always computes and returns them.

**Rationale:** Optional fields would require null-guards throughout the UI. Required fields keep component code simple and declarative.

### Extended `PortfolioSummary` fields

| Field | Type | Description |
|---|---|---|
| `totalReturn` | `number` | All-time absolute gain/loss in USD |
| `totalReturnPercentage` | `number` | All-time return as a percentage |

### Mock strategy
`StockService` returns a single hardcoded fixture object. No computations in the mock — values are typed out explicitly. This accurately represents what a real API response looks like and makes the mock trivially auditable.

**Alternative considered:** Keeping dynamic computation in `StockService` — rejected because it blurs the line between "what the backend computes" and "what the frontend does". Static fixtures are unambiguous.

### `App.tsx` changes
Remove the three-line calculation block inside `.map()`. Read `pos.marketValue`, `pos.unrealizedGain`, `pos.unrealizedGainPercentage` directly from the position object.

## Risks / Trade-offs

- [Risk] Mock values become stale/inconsistent as more fields are added → Mitigation: all mock values are in one place (`StockService.ts`) and auditable at a glance
- [Risk] `total-return-card` change has overlapping data layer tasks → Mitigation: noted in proposal; data layer tasks in that change are superseded by this one
