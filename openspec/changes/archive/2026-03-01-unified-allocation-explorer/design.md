## Context

The dashboard renders two stacked `AllocationChart` cards. `AllocationChart` is a self-contained donut renderer that accepts `data`, `title`, `colorFn`, and `labelFn` props — it owns no dimension state. The new `AllocationExplorer` component sits one layer above `AllocationChart`, owning the list of views and the active selection; `AllocationChart` remains unchanged.

## Goals / Non-Goals

**Goals:**
- Single allocation card with an iOS-style segmented pill selector to switch between "Asset Class" and "Holdings" views
- Animation replay (donut entry) on every dimension switch via `key={activeKey}` remount
- Extensible: adding a future dimension (sector, geography, market cap) = appending one object to the `views` array in `App.tsx`, no component changes
- Reduced skeleton count in `LoadingState` (two placeholders → one)

**Non-Goals:**
- No new backend data or API changes
- No modification to `AllocationChart` internals
- No persistence of selected dimension (per-session ephemeral state only)
- Not building future dimensions — only establishing the architecture

## Decisions

### 1. `AllocationDimension` interface lives in `AllocationExplorer.tsx`, not `src/types/index.ts`

**Rationale**: This type is a UI-layer concern — it bundles render functions (`colorFn`, `labelFn`) alongside data. Putting it in shared types would pollute the data model with React render logic. Consumers create dimension arrays inline in `App.tsx`; TypeScript infers the type without an explicit import.

**Alternative considered**: Export from `AllocationChart.tsx`. Rejected — `AllocationChart` should stay unaware of the explorer concept; the explorer is a consumer of the chart, not the other way around.

### 2. Remount `AllocationChart` on dimension switch via `key={activeKey}`

**Rationale**: `AllocationChart` runs its entry animation (`strokeDasharray` expand) in a `useEffect` that fires on mount. Re-keying forces a remount, replaying the animation without modifying `AllocationChart`. This is the idiomatic React pattern for resetting component state.

**Alternative considered**: Expose a `resetAnimation` callback / imperative ref on `AllocationChart`. Rejected — adds complexity to the pure renderer and couples it to the explorer.

### 3. Segmented pill selector styled in inline styles, consistent with `AllocationChart`

**Rationale**: The entire `AllocationChart` component uses inline styles rather than CSS classes. Matching this convention in `AllocationExplorer` keeps the component self-contained and avoids adding new CSS class names that could conflict. The pill uses `var(--accent)` for the active pill background and `var(--text-muted)` for inactive pills — consistent with existing token usage.

**Alternative considered**: CSS module or classes in `App.css`. Rejected — `AllocationChart` sets the pattern of inline styles; mixing styles would be inconsistent.

### 4. Card wrapper owned by `AllocationExplorer`, not `AllocationChart`

**Rationale**: Currently `AllocationChart` renders its own card wrapper (border, radius, shadow, padding). With the explorer, the card wraps both the pill selector and the chart body. To avoid double-wrapping, `AllocationExplorer` provides the card and passes `AllocationChart` without its own wrapper.

**Implementation note**: `AllocationChart` already renders its own card wrapper today. Rather than modifying `AllocationChart` (goal: no changes), `AllocationExplorer` will simply contain it — the explorer card provides outer structure, `AllocationChart` renders inside and its border/background becomes the inner chart body. This is a minor visual nesting but avoids touching `AllocationChart`.

**Revision**: On reflection, this produces double-border nesting. Better: `AllocationExplorer` renders as a single card, and passes props down to `AllocationChart` which already renders the card. `AllocationExplorer` itself is a thin wrapper that renders the pill selector above whatever `AllocationChart` renders. This keeps the existing card shell inside `AllocationChart` and the explorer only contributes the pill row. No card wrapper in `AllocationExplorer`.

## Risks / Trade-offs

- **Double card shell**: `AllocationChart` renders its own card wrapper; `AllocationExplorer` adds a pill selector row above it. The result is the pill selector floats outside the card box visually unless addressed. → Mitigation: Wrap both pill selector + `AllocationChart` in a single container `div` styled as a card in `AllocationExplorer`, and strip the card wrapper from `AllocationChart`... but that requires touching `AllocationChart`. → Final mitigation: Render the pill selector inside a thin wrapping div with no card styles; let `AllocationChart`'s own card render as-is. The pill selector sits above the existing card. This is acceptable — the pill acts as a tab bar above the chart card, similar to how section headers sit above table cards in the current layout.

- **Animation delay accumulation**: `AllocationChart` uses `animation: fadeUp ... calc(var(--anim-stagger) * 3)`. The stagger value was calibrated for two charts rendering sequentially. With a single explorer, the delay is still appropriate; no change needed.

- **Tooltip clipping on dimension switch**: Tooltip is positioned absolutely within `AllocationChart`. Remounting clears tooltip state automatically — no stale tooltip risk.

## Open Questions

None — all decisions resolved above.
