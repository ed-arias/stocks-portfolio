## Context

The app currently only shows open (active) positions. Users who have sold holdings entirely have no way to review their trade history, realized returns, or hold periods. The holdings section needs a companion view for closed positions.

The existing holdings table already establishes strong patterns: asset-class grouping, sortable columns, column-aligned subtotals, and collapsible sections. This feature should feel like a natural extension of that same section.

## Goals / Non-Goals

**Goals:**
- Introduce a `ClosedPosition` type that captures all data needed for a post-trade review (ticker, company, asset class, shares, avg cost, exit price, realized P&L absolute + %, hold period in days)
- Add `StockService.getClosedPositions()` returning static mock data
- Render a "Closed Positions" collapsible section beneath the active holdings table, matching its visual style
- Support sorting by any column; group rows by asset class with collapsible sections (matching feature 2.10 pattern)

**Non-Goals:**
- Editing or deleting closed position records (that belongs to transaction management — Epic 12)
- Linking closed positions back to their transaction history (deferred)
- Multi-period filtering by close date
- Pagination

## Decisions

### 1. `ClosedPosition` is a separate type from `StockPosition`

`StockPosition` models a live holding with fields like `currentPrice`, `dailyChange`, `unrealizedGain`, and `transactions[]` — none of which apply to a closed position. Merging them with optional fields would add noise and weaken type safety.

`ClosedPosition` is a clean, flat type: only the fields needed for post-trade review.

**Alternative considered**: flag `StockPosition` with `shares: 0` and `closed: true`. Rejected — would require null-guarding live-holding fields everywhere.

### 2. `StockService.getClosedPositions()` is a standalone method

Consistent with the existing pattern: `getPortfolioSummary()` and `getPortfolioHistory()` are separate methods. Closed positions are conceptually independent from the live portfolio snapshot.

**Alternative considered**: embed `closedPositions[]` inside `PortfolioSummary`. Rejected — `PortfolioSummary` is already the live snapshot type; closed positions are historical and fetched separately.

### 3. Closed positions section is collapsible and defaults to collapsed

The active holdings table is the primary view; closed positions are secondary reference data. Defaulting to collapsed keeps the dashboard uncluttered and matches the collapsible asset-class group pattern already in place.

### 4. Asset-class grouping and sort follow the active holdings pattern

Feature 2.10 established collapsible asset-class groups with column-aligned subtotals. Reusing the same grouping/sort hooks and CSS classes keeps the two tables visually consistent and avoids a parallel implementation.

Subtotals for the closed table: total realized gain/loss (absolute sum) per group.

### 5. Hold period displayed in human-readable form

Store hold period as `holdDays: number` (backend-computed). Display as "Xd", "Xmo", or "Xy Xmo" depending on magnitude — purely a formatting concern in the component.

## Risks / Trade-offs

- **Mock data scope**: Mock data needs at least 2–3 closed positions across multiple asset classes to validate grouping. Keep it small but representative.
- **Subtotal semantics**: Summing realized gain/loss per group is straightforward; percentage subtotals are ambiguous (sum of percentages is not meaningful), so the group subtotal row shows only the absolute sum and leaves the % column blank.
- **Reuse vs. duplication**: The sorting and grouping logic in `App.tsx` / the existing holdings table will need to be replicated or lifted into a shared hook. Given the scope, local duplication inside `ClosedPositionsTable` is acceptable for now; a shared hook can be extracted later.
