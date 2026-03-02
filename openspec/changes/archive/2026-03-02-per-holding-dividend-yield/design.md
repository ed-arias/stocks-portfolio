## Context

The holdings table currently renders six columns: Ticker, Shares, Avg Cost, Price, Market Value, Gain/Loss, and Daily Change. Dividend yield is a standard metric for every income-producing holding and is absent from the UI. `StockPosition` does not yet carry a `dividendYield` field; the service mock must be extended and the type updated before the column can be rendered.

All financial data in this app flows from `StockService` → `PortfolioSummary` → component state → JSX. The frontend is a pure rendering layer — no arithmetic, only formatting.

## Goals / Non-Goals

**Goals:**

- Extend `StockPosition` with `dividendYield: number` (annual yield %, 0 for non-payers)
- Update the mock service fixture with realistic yield values per position
- Render a **Div. Yield** column in the holdings table using the existing formatting conventions
- Update the `service-contract` spec to capture the new field requirement

**Non-Goals:**

- Yield-on-cost calculation (different metric, different feature)
- Total dividend income per holding (backlog 2.7)
- Dividend calendar or payment-date data (Epic 5)
- Fetching yield from a live API

## Decisions

### `dividendYield` is a flat `number` on `StockPosition` (not nested)

All other per-holding metrics (`dailyChange`, `unrealizedGain`, etc.) are top-level fields. Consistency with the existing shape avoids special-casing in the rendering layer.

*Alternative considered*: a nested `income: { dividendYield, yieldOnCost }` sub-object. Rejected — over-engineered for a single field; can be refactored if 2.7 introduces more income fields.

### Zero means "non-payer"; no nullable type

Using `dividendYield: number` with a value of `0` for non-dividend-paying assets (crypto, growth stocks) keeps the type simple and aligns with how other numeric fields are handled. The column renders "—" when the value is `0`.

*Alternative*: `dividendYield: number | null`. Rejected — adds null-checks throughout the render path for no practical benefit; `0` is semantically unambiguous.

### Column placement: after Daily Change

Dividend yield is a forward-looking income metric, while Gain/Loss and Daily Change are backward-looking price metrics. Placing yield last follows the logical flow: cost basis → current price → capital performance → income.

## Risks / Trade-offs

- **Mock yield values are static** → When a real API is wired, some positions may have zero yield despite non-zero mock data. This is acceptable for a mock-driven app.
- **Non-payer dash rendering** → Rendering "—" for zero avoids cluttering rows with `0.00%` for crypto/ETFs that don't pay dividends, but requires a formatting branch in the table cell.

