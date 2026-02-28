# Tasks: Theming & Dashboard Overview

## Checklist

- [x] Define CSS variables for Light and Dark themes in `index.css`
- [x] Implement `ThemeProvider` context (exposes `theme` and `toggleTheme`)
- [x] Implement `ThemeToggle` component wired to `ThemeProvider`
- [x] Apply `data-theme` attribute to `<html>` on toggle
- [x] Scaffold `StockService.ts` returning dummy `StockPosition[]` data
- [x] Build reusable `Card` component for dashboard widgets
- [x] Build `Dashboard` feature with `TotalValue` card
- [x] Build `Dashboard` feature with `DailyGainLoss` card (green/red color indicators)
- [x] Build `Dashboard` feature with `HoldingSummary` card
- [x] Verify instant theme switching with no layout shift
- [x] Verify layout is responsive and visually consistent in both themes

## Acceptance Criteria

- UI color scheme changes instantly when the theme toggle is activated
- Dashboard displays realistic-looking mock portfolio data
- Layout is responsive and visually consistent in Light and Dark modes
- Daily Gain/Loss renders green for positive values, red for negative
