## Why

The current UI is functional scaffolding built on the Vite default template — generic fonts, flat card layouts, an unstyled header, and no visual identity. It does not reflect the quality bar expected of a financial application and makes no meaningful use of the existing theming system.

## What Changes

- Replace `index.css` with a fully redesigned global stylesheet: new typography system (Google Fonts), refined CSS variable palette for both Light and Dark themes, staggered entrance animations
- Replace `App.css` with a layout system built around editorial hierarchy and spatial composition
- Rewrite `App.tsx` layout: new header with logotype and icon toggle, redesigned summary cards with data emphasis, redesigned holdings table with row hover states and visual weight on key columns
- Implement a distinctive loading state with a skeleton or branded animation
- All existing logic preserved: `ThemeContext`, `StockService`, `PortfolioSummary` types remain untouched

## Capabilities

### New Capabilities
- `dashboard-ui`: The visual layer of the portfolio dashboard — header, summary cards, holdings table, loading state, and theme toggle rendered with a production-grade aesthetic

### Modified Capabilities
- (none — no existing specs to delta against)

## Impact

- `src/App.tsx` — full rewrite of JSX structure and layout
- `src/App.css` — full replacement
- `src/index.css` — full replacement (CSS variables, typography, global tokens)
- No changes to `src/context/`, `src/services/`, or `src/types/`
- No new dependencies required (Google Fonts loaded via `<link>` in `index.html`)
