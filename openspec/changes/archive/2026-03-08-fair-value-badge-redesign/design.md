## Context

The Fair Value cell currently renders three sibling elements horizontally inside `.fv-cell`:

1. A price span (`$142.50`) — JetBrains Mono, muted
2. A standalone upside span (`+12.3%`) — colored positive/negative
3. A `.fv-badge` pill (`↑ Undervalued`) — JetBrains Mono, 10px, border, `::before` arrow

This conflicts with two established patterns in the table:

- **P&L / Daily Change columns** stack values vertically (`.pl-cell`: `flex-direction: column`) with the primary value on top and percentage below.
- **Analyst Rating badge** uses `font-ui`, `100px` border-radius, no border, and a `[Label · count]` internal structure — a pattern designed for qualitative data signals, which valuation tier also is.

The arrows (↑ → ↓) are the most visible inconsistency: they are injected via CSS `::before` `content` property and exist nowhere else in the design system. The label text ("Undervalued", "Fair", "Overvalued") already communicates direction — the arrows are redundant and visually noisy.

## Goals / Non-Goals

**Goals:**
- `.fv-badge` becomes visually indistinguishable in structure from `.rating-badge`
- `.fv-cell` layout matches `.pl-cell` (vertical stack, right-aligned)
- Upside % is surfaced inside the badge as `[Undervalued · +12.3%]` — no standalone percentage span
- All `::before` arrow rules removed from CSS
- Both table render paths updated (flat rows and grouped rows)

**Non-Goals:**
- Changing color tokens (`--fv-*` in `index.css`) — colors already work correctly
- Changing the three-tier threshold logic (`fairValueTier`)
- Changing sort behaviour
- Changing the column label or toggle behaviour
- Any changes to `StockService`, types, or mock data

## Decisions

### D1: Embed upside % inside the badge rather than keeping it as a sibling span

**Decision**: Move the upside percentage into the badge as `.fv-pct`, making the badge self-contained: `[Undervalued · +12.3%]`.

**Rationale**: The standalone percentage span had its own positive/negative color class, creating a second color signal competing with the badge's background color. Embedding the percentage inside the badge unifies the signal — one pill, one color, all information. This is exactly how `.rating-badge` works: `[Buy · 24]` where `24` is the analyst count.

**Alternative considered**: Keep the standalone percentage, just remove the arrows from the badge → rejected; still leaves two competing color signals and the horizontal layout inconsistency.

### D2: Use `font-ui` for the badge label (not `font-data`)

**Decision**: Switch `.fv-badge` from `var(--font-data)` to `var(--font-ui)` to match `.rating-badge`.

**Rationale**: "Undervalued", "Fair", "Overvalued" are qualitative labels, not numeric data. JetBrains Mono is appropriate for prices, percentages, and counts — not for word labels. The analyst rating badge correctly uses Figtree for its label.

### D3: Remove border entirely (not just set to transparent)

**Decision**: Remove `border: 1px solid transparent` and all `border-color` declarations from `.fv-badge` variants.

**Rationale**: No other badge in the system uses a border. The `border: 1px solid transparent` was a placeholder that added visual weight without semantic purpose. Removing it entirely keeps the pill consistent with `.rating-badge`, `.closed-gl-pill`, and `.card-change`.

## Risks / Trade-offs

- **Badge width increases slightly** → The `[Label · +12.3%]` badge is wider than the old `[↑ Label]` badge. At 300px right-rail width the badge fits comfortably; in the table column the wider badge may require a slightly wider column on very narrow viewports. Mitigation: `white-space: nowrap` is already applied; the table has `overflow-x: auto`.
- **`.fv-pct` opacity (0.65)** → The percentage is de-emphasised relative to the label. This is intentional — the tier label is the primary signal; the exact % is secondary. Matches the `.rating-count` opacity treatment.
