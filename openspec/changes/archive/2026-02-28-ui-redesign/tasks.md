## 1. Typography & Font Setup

- [x] 1.1 Choose display font and data font using `/frontend-design` aesthetic direction
- [x] 1.2 Add Google Fonts `<link>` preconnect and stylesheet to `index.html`
- [x] 1.3 Define `--font-display` and `--font-data` CSS custom properties on `:root`

## 2. CSS Design Tokens

- [x] 2.1 Replace `index.css` `:root` block with new Light theme token set (bg, surface, border, text, accent, success, danger)
- [x] 2.2 Replace `[data-theme='dark']` block with fully realized Dark theme tokens (not just color swaps — use depth and layering)
- [x] 2.3 Define animation tokens: `--anim-duration`, `--anim-ease`, `--anim-stagger`
- [x] 2.4 Remove Inter from font-family declaration

## 3. Layout System

- [x] 3.1 Replace `App.css` with sidebar + main layout for desktop (≥900px)
- [x] 3.2 Implement single-column collapse for mobile (<900px) via media query
- [x] 3.3 Define grid areas: `sidebar`, `main`, `holdings`

## 4. Header & Theme Toggle

- [x] 4.1 Redesign header in `App.tsx` with logotype using display font
- [x] 4.2 Replace text button with icon-based theme toggle (sun/moon SVG or CSS)
- [x] 4.3 Style header for both sidebar (vertical) and mobile (horizontal top bar) layouts

## 5. Summary Cards

- [x] 5.1 Redesign Total Portfolio Value card with large display-font value and subordinate label
- [x] 5.2 Redesign Daily Gain/Loss card with success/danger color tokens and directional indicator
- [x] 5.3 Apply staggered entrance animation to cards (`animation-delay` per card)

## 6. Holdings Table

- [x] 6.1 Apply tabular-nums (`font-variant-numeric: tabular-nums`) to all numeric columns
- [x] 6.2 Style ticker column as visually prominent (display font or weight)
- [x] 6.3 Apply success/danger color tokens to profit/loss column per row
- [x] 6.4 Style table header with refined uppercase labels and subtle separator
- [x] 6.5 Add row hover state consistent with the theme

## 7. Loading State

- [x] 7.1 Replace plain text loading state with a styled skeleton or branded spinner
- [x] 7.2 Ensure loading state uses the same layout shell (header visible during load)

## 8. Entrance Animations

- [x] 8.1 Define `@keyframes` for fade-and-translate-up entrance in `index.css`
- [x] 8.2 Apply staggered animation to summary cards (80ms offset each)
- [x] 8.3 Apply staggered animation to table rows on data load
- [x] 8.4 Verify all animations complete within 600ms total and do not loop

## 9. Verification

- [x] 9.1 Run `npm run build` — zero TypeScript errors
- [x] 9.2 Run `npm run lint` — zero ESLint errors
- [x] 9.3 Verify Light theme: all surfaces, typography, and color tokens render correctly
- [x] 9.4 Verify Dark theme: all surfaces use depth/layering, not flat color swaps
- [x] 9.5 Verify responsive layout collapses correctly at 900px breakpoint
- [x] 9.6 Verify theme toggle persists across page reload
