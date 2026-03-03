## Context

The holdings table has a "Profit / Loss" column (unrealized capital gain/loss only). This does not reflect the full picture for dividend-paying holdings like AAPL, MSFT, and VOO, where income received inflates true total return above unrealized gain. Adding a separate "Total Return" column makes both metrics visible side by side.

All per-holding financial metrics flow from `StockService` → `PortfolioSummary.positions` → component state → JSX. The frontend is a pure rendering layer — no arithmetic, only formatting.

## Goals / Non-Goals

**Goals:**

- Extend `StockPosition` with `totalReturn: number` and `totalReturnPercentage: number` (both pre-computed by backend)
- Update the mock service fixture with realistic total return values (unrealizedGain + dividends received to date)
- Render a **Total Return** column in the holdings table using the existing `.pl-cell` / `.pl-pct` stacked layout and green/red color coding
- Update the `service-contract` spec

**Non-Goals:**

- Returns breakdown (capital gains vs. dividend income split) — backlog 3.2
- Annualized return (CAGR) — backlog 3.3
- Time-weighted or money-weighted return — backlog 3.4 / 3.5
- Removing or replacing the existing "Profit / Loss" column (unrealized gain remains useful on its own)

## Decisions

### Two flat fields on `StockPosition` (not nested)

`totalReturn` and `totalReturnPercentage` follow the same flat shape as `unrealizedGain` / `unrealizedGainPercentage` and `dailyChange` / `dailyChangePercentage`. Consistency avoids special-casing in the render layer.

*Alternative*: a nested `returns: { unrealized, total }` object. Rejected — premature grouping; the existing shape is already established and works well.

### `totalReturnPercentage` is relative to cost basis (not market value)

`totalReturnPercentage = (totalReturn / costBasis) * 100`. This matches the convention already used for `unrealizedGainPercentage`, making the two columns directly comparable.

### Column placement: after Profit / Loss

Total Return is the superset of Profit / Loss. Placing it immediately after creates a natural left-to-right progression: capital-only → total (capital + income).

## Risks / Trade-offs

- **Mock dividends received are fabricated** → Static fixtures; acceptable for a mock-driven app. Values should be plausible (small fraction of annual yield × approximate hold time).
- **Two similar columns may confuse users** → Mitigation: column headers are distinct ("Profit / Loss" vs "Total Return"); tooltips or a legend can clarify in a future UX pass.
