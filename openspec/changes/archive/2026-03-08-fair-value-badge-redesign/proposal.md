## Why

The Fair Value column badge uses Unicode arrow characters (↑ → ↓) injected via CSS `::before` pseudo-elements — a pattern that exists nowhere else in the design system — and applies a border, a data-mono font, and a horizontal three-element layout that conflicts with every other badge and data cell in the table. Fixing this now brings the column into full visual parity with the analyst rating badge introduced in feature 2.13.

## What Changes

- Remove arrow pseudo-elements (`↑`, `→`, `↓`) from `.fv-badge::before` — direction is already conveyed by color and label text
- Rewrite `.fv-badge` to mirror `.rating-badge` exactly: `font-ui`, `100px` border-radius, no border, `[Label · data]` internal structure
- Embed the upside/downside percentage inside the badge as a secondary data point (`.fv-pct`), eliminating the standalone `%` span
- Change `.fv-cell` layout from horizontal (`price | % | badge`) to vertical stack (`price` above `badge`), mirroring the P&L and Daily Change columns
- Add `.fv-dot` and `.fv-pct` child element classes consistent with `.rating-dot` and `.rating-count`

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `fair-value-estimate-column`: Visual treatment of the cell and badge changes — layout, typography, badge structure, and removal of arrow characters

## Impact

- `src/App.css`: `.fv-badge`, `.fv-cell`, `.fv-undervalued`, `.fv-fair`, `.fv-overvalued` rewritten; `.fv-badge::before` and tier `::before` rules removed; `.fv-dot`, `.fv-pct` added
- `src/App.tsx`: Fair value cell JSX updated in both grouped and flat row renders — standalone upside `<span>` removed, `fv-dot` + `fv-pct` added inside badge
- No changes to types, services, color tokens (`index.css`), or sort logic
