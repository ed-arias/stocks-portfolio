## Context

Feature 1.5 introduced a per-asset-class donut chart backed by a one-off `AssetAllocationBreakdown` type and a dedicated `AssetAllocationChart` component. The component hard-codes a `COLOR_MAP` and `LABEL_MAP` keyed on `AssetClass`. Adding a second dimension of breakdown (per-holding, feature 1.12) would require duplicating the component or parameterizing it incrementally. Instead, this design generalizes the architecture at both the data layer and component layer in a single cohesive change.

Current state:
- `StockPosition.portfolioWeight` duplicates data that can be derived from the holding's contribution to total value
- `PortfolioSummary.assetAllocation: AssetAllocationBreakdown[]` is a single-dimension array
- `AssetAllocationChart` is a closed component — it owns color and label logic internally

## Goals / Non-Goals

**Goals:**
- Replace `AssetAllocationBreakdown` with a generic `AllocationBreakdown` interface usable for any grouping dimension
- Replace `AssetAllocationChart` with a generic `AllocationChart` accepting caller-supplied `colorFn` and `labelFn`
- Remove `portfolioWeight` from `StockPosition`; move per-holding weight into `allocations.byHolding`
- Render both asset-class and holdings breakdowns on the dashboard
- Keep all breaking changes contained in one commit

**Non-Goals:**
- Sector or geographic allocation dimensions (future features 1.6, 1.7)
- Interactive drill-down or click-to-filter behavior
- Any real API integration — mock data only

## Decisions

### Decision: Generic `AllocationBreakdown` replaces `AssetAllocationBreakdown`
**Choice:** Single `AllocationBreakdown` interface with `key: string` instead of `assetClass: AssetClass`.
**Rationale:** A string key is dimension-agnostic. Callers that need asset-class color semantics can still use `assetClass?: AssetClass` on the optional field. Alternatives considered: keeping both types and having `AllocationChart` accept a union — rejected because it adds complexity without benefit; a union of typed breakdowns doesn't improve type safety at the call site.

### Decision: `colorFn` / `labelFn` as render props instead of lookup maps
**Choice:** `AllocationChart` accepts `colorFn: (item: AllocationBreakdown) => string` and `labelFn: (item: AllocationBreakdown) => string`.
**Rationale:** Props are the idiomatic React way to inject behavior. A `colorMap` prop would require callers to enumerate keys upfront; a function lets callers use any logic (e.g., fall through to `item.assetClass` when `item.key` has no specific color). Alternatives: a `colorMap: Record<string, string>` prop — rejected because it can't handle fallback logic without coupling to the component internals.

### Decision: `portfolioWeight` removed from `StockPosition`
**Choice:** Remove the field entirely; weight data lives only in `allocations.byHolding`.
**Rationale:** Having the same data in two shapes (position field vs. allocation array) creates a consistency surface — they could drift. The holdings table no longer renders a weight column (feature 2.4 superseded), so no consumer needs `portfolioWeight` on the position object.

### Decision: `allocations` object on `PortfolioSummary` instead of top-level arrays
**Choice:** `allocations: { byAssetClass: AllocationBreakdown[]; byHolding: AllocationBreakdown[] }` as a nested object.
**Rationale:** Grouping allocation dimensions under a single key makes the shape extensible (future `bySector`, `byRegion`) without polluting the top-level `PortfolioSummary` with multiple array fields. Flat alternatives (e.g., `assetClassAllocation` + `holdingAllocation`) work but don't scale cleanly.

## Risks / Trade-offs

- **Breaking change** to `StockPosition` and `PortfolioSummary` — any consumer reading `portfolioWeight` or `assetAllocation` directly will break at compile time. Mitigation: TypeScript will surface all call sites immediately; this is a single-component app so the surface is small.
- **Deleted component** (`AssetAllocationChart`) — no deprecation path needed since this is a personal project with no external consumers.
- **colorFn fallback** — if a caller passes a `colorFn` that returns an unknown CSS variable, the segment renders transparent. Mitigation: `var(--asset-stock)` is the safe fallback both call sites use.

## Migration Plan

1. Update `src/types/index.ts` (breaking type changes)
2. Update `src/services/StockService.ts` (mock data)
3. Delete `AssetAllocationChart`, create `AllocationChart`
4. Update `App.tsx` (imports + two chart renders)
5. Update `App.css` (second skeleton style)
6. Update docs (`README.md`, `CHANGELOG.md`, `BACKLOG.md`)
7. `npm run build && npm run lint` — must pass with zero errors
8. Single logical commit covering all files

Rollback: `git revert <commit>` — the entire change is one commit.
