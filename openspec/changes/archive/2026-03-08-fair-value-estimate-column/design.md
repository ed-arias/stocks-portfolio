## Context

The holdings table already has a column picker (2.8), sortable columns (2.9), and the analyst rating column (2.13) which established the pattern for optional, sortable, badge-rendered columns. This feature follows the same pattern exactly — no infrastructure changes required.

Fair value estimates come from financial data providers (Morningstar, Simply Wall St, Seeking Alpha). For this feature, mock data is used. The valuation model is price-based: a `price` estimate is compared against `currentPrice` to derive an upside/downside percentage and a three-tier valuation label.

## Goals / Non-Goals

**Goals:**
- Add `fairValue` as an optional field on `StockPosition` with an estimated price and source label
- Show fair value price, upside/downside %, and a Undervalued / Fair / Overvalued badge per holding
- Column is toggleable via column picker, sortable by upside %, and visible by default

**Non-Goals:**
- Fetching live fair value data from any API
- Showing methodology or valuation model breakdown (belongs to a detail view)
- Supporting multiple competing estimates per position

## Decisions

### FairValueEstimate type: flat fields vs. nested interface
**Decision:** Use a `FairValueEstimate` interface with `price: number` and `source: string`, wrapped as an optional field `fairValue?: FairValueEstimate` on `StockPosition`.

**Rationale:** Grouping into an interface keeps `StockPosition` clean, makes the field easy to make optional, and mirrors the `AnalystRating` pattern established in 2.13. `source` allows the UI to credit the estimate provider (e.g., "Morningstar") without additional fields.

**Alternative considered:** Flat `fairValuePrice` and `fairValueSource` fields — rejected for consistency with the interface pattern used throughout the type system.

### Upside/downside computation: frontend vs. backend
**Decision:** The upside/downside percentage is computed by the frontend as `((fairValue.price - currentPrice) / currentPrice) * 100`.

**Rationale:** This is pure display arithmetic derived from two fields already present on the position — it is not a financial calculation in the sense that it affects P&L or cost basis. It follows the same pattern as percentage formatting elsewhere in the app. The backend pre-computes financial metrics; the frontend computes trivial display ratios.

**Exception to the no-arithmetic rule:** The "frontend never does financial arithmetic" rule applies to portfolio accounting (gains, returns, allocations). Displaying a simple ratio between two prices for UI purposes is presentation logic, not accounting.

### Valuation badge thresholds
**Decision:** Three tiers based on upside %:
- **Undervalued**: upside > +10% (price is more than 10% below fair value)
- **Fair**: upside between −10% and +10%
- **Overvalued**: upside < −10% (price is more than 10% above fair value)

**Rationale:** ±10% is the conventional "margin of safety" threshold used by value investors and matches Morningstar's Fair Value Uncertainty bands at the moderate level. Simple and intuitive.

### Sort key: by upside percentage
**Decision:** Sort the Fair Value column by upside/downside % (most undervalued first when ascending). Positions without a fair value estimate sort last.

**Rationale:** Sorting by the raw `fairValue.price` would be meaningless across positions at different price levels. Upside % is the actionable signal.

## Risks / Trade-offs

- **Frontend upside arithmetic** — the ±10% thresholds and upside % are display-only and will change when a real API is wired up; no financial decisions should rely on mock data.
- **Optional field null checks** — handled consistently with the `analystRating` pattern: a guard `pos.fairValue ? ... : '—'` in each render site.

## Migration Plan

No migration required. The new field is additive and optional. Existing mock data without the field continues to work — positions will simply show "—" in the new column.
