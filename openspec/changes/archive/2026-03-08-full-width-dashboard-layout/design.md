## Context

The previous dashboard layout used a `display: grid; grid-template-columns: 1fr 300px` grid. The AllocationExplorer renders its donut and legend horizontally (side-by-side via `display: flex`). At the 300px right-rail width the legend wraps below the donut, making the card ~560px tall. CSS Grid's `align-items: start` made the chart card respect the row height set by the taller right rail, causing the PortfolioChart card to grow to ~560px even though the chart itself was only 260–280px tall — leaving ~300px of wasted space. A "fix" using `align-self: stretch` on the chart panel made it fill the row, but this stretched the chart card height without adding any information — exchanging one waste for another.

## Goals / Non-Goals

**Goals:**
- Each content section has exactly the height it needs — no artificial stretching
- AllocationExplorer renders at full width so its horizontal layout stays ~280px tall
- Portfolio chart renders at a fixed sensible height (280px) with no extra whitespace
- Total Return remains accessible without scrolling (moved to sticky top bar)
- Layout remains responsive at all screen sizes

**Non-Goals:**
- Adding new analytics or metrics
- Changing the AllocationExplorer or PortfolioChart internals
- Supporting a configurable layout

## Decisions

**Decision 1: Remove the 2-column grid entirely — don't try to fix it**

The fundamental issue is that a fixed right rail constrains the AllocationExplorer's horizontal layout, which inflates height and forces the chart to grow. Any approach that keeps the 2-column grid will either waste chart height or waste right-rail width. Solution: drop the grid, make every section full-width.

Alternative considered: make the right rail wider (400–500px). Rejected — increases constraint on chart width and the root cause persists.

**Decision 2: Promote Total Return into the top bar**

With no right rail, the Total Return card has no natural home. Options:
- New card in the main stack (adds vertical scroll before reaching the chart)
- Summary metrics bar below the top bar (extra chrome, similar to the old multi-card grid)
- Second metric in the top bar (zero additional scroll, always visible)

Top bar is the right choice — Total Return is a portfolio-level headline metric, not a section. It joins portfolio value as a permanent fixture. Implementation: `[brand] ··· [value | daily delta | separator | Total Return label | return delta] ··· [controls]`. Separator is a 1px vertical rule (`width: 1px; height: 20px; background: var(--border)`).

**Decision 3: Hide the Total Return group at ≤900px**

The top bar has limited horizontal space at tablet/mobile. The primary metric (portfolio value + daily delta) takes priority. The Total Return group (sep + label + delta) is wrapped in `.top-bar-return-group` and set to `display: none` at ≤900px. The metric remains accessible via the holdings table's Total Return column on those viewports.

**Decision 4: Fixed chart height (280px) — not flex-fill**

`ResponsiveContainer` with `height="100%"` requires its parent to have a definite pixel height. With the grid gone, there is no natural definite height to inherit. Using a fixed `height={280}` avoids the need for a wrapper div with a set pixel height and matches the previous chart content area size.

## Risks / Trade-offs

- [Total Return hidden on mobile] At ≤900px the metric disappears from the top bar → users can still find it in the holdings table Total Return column or via a future summary metrics bar. Acceptable for now.
- [Fixed chart height] At very large monitors (>1800px) 280px may feel small relative to screen area → can be increased in a future change or made responsive with a CSS clamp().

## Migration Plan

No data model changes. Pure layout change — reversible by reintroducing the grid. No rollback procedure required beyond a git revert.
