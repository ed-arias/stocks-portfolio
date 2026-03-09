## 1. CSS — Badge Rewrite

- [x] 1.1 Remove `.fv-badge::before`, `.fv-undervalued::before`, `.fv-fair::before`, `.fv-overvalued::before` rules (arrow characters)
- [x] 1.2 Rewrite `.fv-badge`: switch to `font-ui`, `font-size: 11.5px`, `font-weight: 600`, `border-radius: 100px`, `gap: 4px`, `padding: 3px 9px` — remove `border: 1px solid transparent`
- [x] 1.3 Remove `border-color` declarations from `.fv-undervalued`, `.fv-fair`, `.fv-overvalued`
- [x] 1.4 Add `.fv-dot { opacity: 0.4; font-weight: 400; }` — mirrors `.rating-dot`
- [x] 1.5 Add `.fv-pct { font-family: var(--font-data); font-size: 10px; font-weight: 500; opacity: 0.65; }` — mirrors `.rating-count`

## 2. CSS — Cell Layout

- [x] 2.1 Rewrite `.fv-cell`: change to `flex-direction: column`, `align-items: flex-end`, `gap: 4px` — mirrors `.pl-cell`

## 3. TSX — Cell JSX (both render paths)

- [x] 3.1 In the **flat rows** render path: remove the standalone upside `<span className={upside >= 0 ? 'positive' : 'negative'}>` element from `.fv-cell`
- [x] 3.2 In the **flat rows** render path: add `<span className="fv-dot">·</span>` and `<span className="fv-pct">{upside >= 0 ? '+' : ''}{upside.toFixed(1)}%</span>` inside `.fv-badge`
- [x] 3.3 In the **grouped rows** render path: apply the same JSX changes as 3.1 and 3.2

## 4. Verification

- [x] 4.1 Run `npm run build` — zero TypeScript errors
- [x] 4.2 Run `npm run lint` — zero ESLint errors
- [x] 4.3 Verify no arrow characters appear in the Fair Value column
- [x] 4.4 Verify badge shape matches analyst rating badge (same border-radius, no border, Figtree label)
- [x] 4.5 Verify cell stacks vertically: price on top, badge below, right-aligned
- [x] 4.6 Verify all three badge states (Undervalued / Fair / Overvalued) render correctly in light and dark theme
