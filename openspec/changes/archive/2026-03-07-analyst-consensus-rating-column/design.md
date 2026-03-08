## Context

The holdings table has a column picker (feature 2.8) and sortable columns (feature 2.9). Both systems are extensible: adding a new column requires defining it in the column registry in `App.tsx`, adding render logic in the table row, and supplying mock data in `StockService`. No changes to the column-picker or sortable-columns infrastructure are needed.

Analyst consensus ratings come from brokerage/data providers (e.g., Yahoo Finance, Seeking Alpha). For this feature, mock data is used. The rating model follows the standard five-tier scale used across major financial platforms.

## Goals / Non-Goals

**Goals:**
- Add `analystRating` to `StockPosition` as an optional field (some assets like crypto may not have ratings)
- Render a color-coded badge per holding in a toggleable, sortable "Analyst Rating" column
- Maintain consistency with existing column picker and sort infrastructure

**Non-Goals:**
- Fetching live analyst data from any API
- Showing individual analyst breakdown or price target details (that belongs to feature 8.4)
- Modifying the column picker or sort infrastructure

## Decisions

### Rating type: enum-style union vs. plain string
**Decision:** Use a typed union `'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell'` with an `analystCount` alongside it, wrapped in an `AnalystRating` interface.

**Rationale:** A union type gives exhaustive type-checking for badge rendering. A free-form string would require runtime validation and make badge logic brittle. Grouping into an interface (rather than two flat fields) keeps `StockPosition` clean and makes the field easy to make optional (`analystRating?: AnalystRating`).

**Alternative considered:** A numeric score (1–5) — rejected because rendering requires mapping back to a label anyway, and the string union is self-documenting.

### Optional vs. required field
**Decision:** `analystRating` is `optional` (`?`) on `StockPosition`.

**Rationale:** Crypto assets and some niche instruments have no analyst coverage. Making the field optional avoids forcing dummy data into mock fixtures and correctly models the real backend contract.

### Sort order for the rating column
**Decision:** Sort by a fixed ordinal mapping: Strong Buy (1) → Buy (2) → Hold (3) → Sell (4) → Strong Sell (5). Positions with no rating sort last.

**Rationale:** Alphabetic sort is meaningless for this field. Ordinal order matches user intuition (ascending = most bullish first). This mapping is applied only in the sort comparator — the display value remains the label string.

### Badge styling
**Decision:** Five distinct color tokens mapped to rating tiers, defined as CSS custom properties. Strong Buy / Buy share a green family; Hold uses a neutral amber; Sell / Strong Sell use a red family (consistent with the existing `--success` / `--danger` palette).

**Rationale:** Reusing existing token families ensures light/dark theme consistency without adding new token complexity.

## Risks / Trade-offs

- **Mock data is static** → real data will differ; the `AnalystRating` interface is designed to be backend-compatible with no frontend changes needed when a real API is wired up.
- **Optional field means null checks everywhere** → use a helper `formatRating(r?: AnalystRating)` or conditional rendering to centralise the null guard.

## Migration Plan

No migration required. The new field is additive and optional. Existing mock data without the field continues to work — positions will simply show no badge in the new column.
